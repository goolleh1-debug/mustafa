

import { GoogleGenAI, Modality } from "@google/genai";
import { GeneratedCourseContent, CourseFormat, GroundingSource } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Custom error for handling rate limit exhaustion after retries.
export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const isRateLimitError = (error: any): boolean => {
  if (error instanceof Error) {
    const message = error.message.toUpperCase();
    return message.includes('429') || message.includes('RESOURCE_EXHAUSTED') || message.includes('RATE LIMIT');
  }
  return false;
};

type RetryCallback = (attempt: number, maxRetries: number, delaySeconds: number) => void;

export const generateCourseContent = async (
  topic: string, 
  format: CourseFormat, 
  onRetryAttempt?: RetryCallback
): Promise<GeneratedCourseContent> => {
  const jsonInstruction = `
    IMPORTANT: You must respond with ONLY a valid JSON object. Do not include any other text, markdown formatting like \`\`\`json, or any other characters before or after the JSON object. The JSON object should conform to the following structure:
    {
      "introduction": "A brief, engaging introduction to the course topic. Should be around 2-3 paragraphs.",
      "modules": [
        {
          "title": "A clear and concise title for the module.",
          "content": "The main educational content for the module. Use paragraphs, newlines (\\n), and bullet points for clarity. Explain the concept in detail. This should be comprehensive. For video/audio formats, this should be a script.",
          "estimatedTime": "An estimated time to complete the module, e.g., '15 minutes'."
        }
      ],
      "summary": "A concluding summary of the key takeaways from the entire course.",
      "quiz": [
        {
          "question": "The text of the quiz question.",
          "options": [ "An array of 4 strings representing the possible answers." ],
          "correctAnswer": "The correct answer from the options array."
        }
      ]
    }
  `;

  let basePrompt = `Generate a detailed educational course about "${topic}". The target audience is beginners in technology. The tone should be informative, accessible, and engaging. Please provide a comprehensive overview with practical examples where possible. Use up-to-date information from your search results.`;

  if (format === CourseFormat.VIDEO || format === CourseFormat.AUDIO) {
    basePrompt = `Generate a script for an educational ${format === CourseFormat.VIDEO ? 'video' : 'audio segment'} about "${topic}". The target audience is beginners in technology. The tone should be informative, accessible, and engaging. Structure the content into an introduction, 3-5 modules with clear titles, and a summary. The 'content' for each module should be the narration script. Also, create a 3-question multiple-choice quiz based on the script content. Use up-to-date information from your search results.`;
  }
  
  const prompt = `${basePrompt}\n${jsonInstruction}`;
  
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          tools: [{googleSearch: {}}],
        },
      });

      if (!response.text) {
        console.error("AI response missing text content. Full response:", JSON.stringify(response, null, 2));
        throw new Error("The AI model did not return any text content. This could be due to a content filter. Please try a different topic or rephrase your request.");
      }

      const jsonText = response.text.trim();
      const cleanedJsonText = jsonText.replace(/^```json\s*|```$/g, '');
      let courseData;

      try {
          courseData = JSON.parse(cleanedJsonText);
      } catch (parseError) {
          console.error("Failed to parse JSON response from AI:", cleanedJsonText);
          throw new Error("Failed to generate course content because the AI returned an invalid format. Please try again.");
      }

      if (!courseData.introduction || !Array.isArray(courseData.modules) || !courseData.summary || !Array.isArray(courseData.quiz)) {
          throw new Error("Generated content is missing required fields.");
      }
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks && Array.isArray(groundingChunks)) {
          const sources: GroundingSource[] = groundingChunks
              .map(chunk => chunk.web)
              .filter(web => web && web.uri)
              .map(web => ({ uri: web.uri, title: web.title || web.uri }));
          
          const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());
          courseData.sources = uniqueSources;
      }

      return courseData as GeneratedCourseContent;
    } catch (error: any) {
        lastError = error;
        if (isRateLimitError(error)) {
            if (attempt < maxRetries) {
                const delayMs = Math.pow(2, attempt) * 1000 * (0.5 + Math.random()); // Exponential backoff with jitter
                if (onRetryAttempt) {
                    onRetryAttempt(attempt, maxRetries, Math.round(delayMs / 1000));
                }
                await delay(delayMs);
            } else {
                console.error(`Final attempt failed with rate limit error:`, error);
                throw new RateLimitError("Exceeded max retries due to rate limiting.");
            }
        } else {
            console.error("Non-retriable error generating course content:", error);
            throw error;
        }
    }
  }
  throw lastError || new Error("Failed to generate course content after all retries.");
};


export const generateSpeech = async (text: string, onRetryAttempt?: RetryCallback): Promise<string> => {
  const maxRetries = 3;
  let lastError: Error | null = null;
    
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say this naturally: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        throw new Error("No audio data received from API.");
      }
      return base64Audio;
    } catch (error: any) {
        lastError = error;
        if (isRateLimitError(error)) {
            if (attempt < maxRetries) {
                const delayMs = Math.pow(2, attempt) * 1000 * (0.5 + Math.random());
                if (onRetryAttempt) {
                    onRetryAttempt(attempt, maxRetries, Math.round(delayMs / 1000));
                }
                await delay(delayMs);
            } else {
                console.error(`Final attempt failed with rate limit error for speech:`, error);
                throw new RateLimitError("Exceeded max retries for speech generation due to rate limiting.");
            }
        } else {
            console.error("Non-retriable error generating speech:", error);
            throw error;
        }
    }
  }
  throw lastError || new Error("Failed to generate audio after all retries.");
};