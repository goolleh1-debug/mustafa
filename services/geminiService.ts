
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedCourseContent } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const courseContentSchema = {
  type: Type.OBJECT,
  properties: {
    introduction: {
      type: Type.STRING,
      description: 'A brief, engaging introduction to the course topic. Should be around 2-3 paragraphs.'
    },
    modules: {
      type: Type.ARRAY,
      description: 'An array of educational modules. Should contain 3-5 modules.',
      items: {
        type: Type.OBJECT,
        properties: {
          title: { 
            type: Type.STRING, 
            description: 'A clear and concise title for the module.' 
          },
          content: { 
            type: Type.STRING, 
            description: 'The main educational content for the module. Use paragraphs and bullet points for clarity. Explain the concept in detail. This should be comprehensive.'
          },
          estimatedTime: {
            type: Type.STRING,
            description: 'An estimated time to complete the module, e.g., "15 minutes".'
          }
        },
        required: ['title', 'content', 'estimatedTime'],
      },
    },
    summary: {
      type: Type.STRING,
      description: 'A concluding summary of the key takeaways from the entire course.'
    },
    quiz: {
        type: Type.ARRAY,
        description: 'An array of 3 multiple-choice questions to test understanding.',
        items: {
            type: Type.OBJECT,
            properties: {
                question: { 
                    type: Type.STRING,
                    description: 'The text of the quiz question.'
                },
                options: {
                    type: Type.ARRAY,
                    description: 'An array of 4 strings representing the possible answers.',
                    items: { type: Type.STRING }
                },
                correctAnswer: {
                    type: Type.STRING,
                    description: 'The correct answer from the options array.'
                }
            },
            required: ['question', 'options', 'correctAnswer'],
        }
    }
  },
  required: ['introduction', 'modules', 'summary', 'quiz'],
};


export const generateCourseContent = async (topic: string): Promise<GeneratedCourseContent> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a detailed educational course about "${topic}". The target audience is beginners in technology. The tone should be informative, accessible, and engaging. Please provide a comprehensive overview with practical examples where possible.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: courseContentSchema,
      },
    });

    const jsonText = response.text.trim();
    const courseData = JSON.parse(jsonText);

    // Basic validation to ensure the parsed object matches the expected structure.
    if (!courseData.introduction || !Array.isArray(courseData.modules) || !courseData.summary || !Array.isArray(courseData.quiz)) {
        throw new Error("Generated content does not match the expected schema.");
    }

    return courseData as GeneratedCourseContent;
  } catch (error) {
    console.error("Error generating course content:", error);
    throw new Error("Failed to generate course content. Please check the API key and try again.");
  }
};
