import React, { useState, useEffect, useCallback } from 'react';
import { Course, GeneratedCourseContent, User, CourseProgress, CourseFormat } from '../types';
import { generateCourseContent } from '../services/geminiService';
import { LoadingSpinner, CheckCircleIcon, CertificateIcon } from './IconComponents';
import Certificate from './Certificate';
import { useTranslation } from '../useTranslation';

interface CourseViewProps {
  course: Course;
  user: User;
  onBack: () => void;
  initialProgress: CourseProgress | undefined;
  onSaveProgress: (courseId: string, progress: CourseProgress) => void;
}

const PASSING_SCORE = 75;

const CourseView: React.FC<CourseViewProps> = ({ course, user, onBack, initialProgress, onSaveProgress }) => {
  const [content, setContent] = useState<GeneratedCourseContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>(() => initialProgress?.quizAnswers || {});
  const [showResults, setShowResults] = useState<boolean>(() => initialProgress?.quizSubmitted || false);
  const [quizScore, setQuizScore] = useState<number>(() => initialProgress?.quizScore ?? -1);
  const t = useTranslation();

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const timeouts: number[] = [];
    const clearTimeouts = () => timeouts.forEach(clearTimeout);

    // Set up detailed progress messages for media formats
    if (course.format === CourseFormat.VIDEO || course.format === CourseFormat.AUDIO) {
      setLoadingMessage(t('generatingIntroduction'));
      timeouts.push(window.setTimeout(() => setLoadingMessage(t('creatingModules')), 2000));
      timeouts.push(window.setTimeout(() => setLoadingMessage(t('craftingQuiz')), 4000));
    } else {
      setLoadingMessage(t('generatingCourse'));
    }
    
    try {
      const generatedContent = await generateCourseContent(course.title, course.format);
      setContent(generatedContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('unknownError'));
    } finally {
      clearTimeouts();
      setIsLoading(false);
    }
  }, [course.title, course.format, t]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    if (isLoading || !content) return;

    const answeredCount = Object.keys(selectedAnswers).length;
    const totalQuestions = content.quiz.length;
    
    const progressPercentage = showResults
      ? 100
      : (totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0);

    const newProgress: CourseProgress = {
      quizAnswers: selectedAnswers,
      quizSubmitted: showResults,
      quizScore: quizScore >= 0 ? quizScore : undefined,
      progressPercentage: progressPercentage,
    };
    onSaveProgress(course.id, newProgress);

  }, [selectedAnswers, showResults, quizScore, course.id, content, isLoading, onSaveProgress]);
  
  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };
  
  const submitQuiz = () => {
    if (!content) return;
    const totalQuestions = content.quiz.length;
    const correctAnswersCount = content.quiz.reduce((count, question, index) => {
      return count + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
    const score = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;
    setQuizScore(score);
    setShowResults(true);
  };

  const renderMedia = () => {
    if(course.format === CourseFormat.VIDEO) {
        return (
             <div className="aspect-w-16 aspect-h-9 mb-8 bg-black rounded-lg overflow-hidden shadow-lg">
                <iframe 
                    src="https://www.youtube.com/embed/S_QyEZ8v1F4?si=PZ1b98p-Fk0L-8Uu" // Placeholder AI/Tech video
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>
        )
    }
     if(course.format === CourseFormat.AUDIO) {
        return (
             <div className="mb-8 bg-gray-800 p-4 rounded-lg shadow-lg">
                <audio controls className="w-full">
                    {/* Placeholder audio */}
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                    {t('browserNoSupportAudio')}
                </audio>
            </div>
        )
    }
    return null;
  }

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-gray-400">{loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-900/20 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-red-400">{t('failedToLoadCourse')}</h3>
        <p className="text-red-300 mt-2">{error}</p>
        <button onClick={onBack} className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('backToDashboard')}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <button onClick={onBack} className="mb-8 text-cyan-400 hover:text-cyan-300 font-semibold">
          &larr; {t('backToDashboard')}
        </button>
        <h2 className="text-5xl font-extrabold mb-4 text-white">{course.title}</h2>
        
        {renderMedia()}
        
        <p className="text-xl text-gray-400 mb-8">{content?.introduction}</p>

        <div className="space-y-8">
          {content?.modules.map((module, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                  <h3 className="text-2xl font-bold text-cyan-400">{module.title}</h3>
                  <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">{module.estimatedTime}</span>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{module.content}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg mt-12">
          <h3 className="text-2xl font-bold text-cyan-400 mb-3">{t('summary')}</h3>
          <p className="text-gray-300">{content?.summary}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mt-8">
          <h3 className="text-3xl font-bold text-cyan-400 mb-6">{t('testYourKnowledge')}</h3>
          <div className="space-y-6">
            {content?.quiz.map((q, index) => {
              const isCorrect = showResults && selectedAnswers[index] === q.correctAnswer;
              const isWrong = showResults && selectedAnswers[index] && selectedAnswers[index] !== q.correctAnswer;
              
              return (
                <div key={index} className={`p-4 rounded-md ${isCorrect ? 'bg-green-900/50' : ''} ${isWrong ? 'bg-red-900/50' : ''}`}>
                  <p className="font-semibold text-lg mb-4">{index + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((option, optIndex) => {
                      const isSelected = selectedAnswers[index] === option;
                      let buttonClass = 'text-left w-full p-3 rounded-md transition-colors bg-gray-700 hover:bg-gray-600';
                      if (showResults) {
                          if (option === q.correctAnswer) {
                            buttonClass += ' bg-green-700 text-white';
                          } else if (isSelected && option !== q.correctAnswer) {
                            buttonClass += ' bg-red-700 text-white';
                          }
                      } else if (isSelected) {
                          buttonClass += ' bg-cyan-600 text-white';
                      }
                      
                      return (
                          <button key={optIndex} onClick={() => !showResults && handleAnswerSelect(index, option)} disabled={showResults} className={buttonClass}>
                            {option}
                          </button>
                      );
                    })}
                  </div>
                  {showResults && !isCorrect && (
                    <p className="text-sm mt-3 text-yellow-400">{t('correctAnswer')}: {q.correctAnswer}</p>
                  )}
                </div>
              );
            })}
          </div>
          {!showResults && (
              <button onClick={submitQuiz} className="mt-8 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
                  {t('submitAnswers')}
              </button>
          )}
          {showResults && (
            <div className="mt-8 text-center p-6 bg-gray-900 rounded-lg">
              <h4 className="text-2xl font-bold text-white">{t('yourScore')}: <span className={quizScore >= PASSING_SCORE ? 'text-green-400' : 'text-red-400'}>{quizScore}%</span></h4>
              {quizScore >= PASSING_SCORE ? (
                <>
                  <p className="text-green-400 mt-2 font-semibold">{t('congratulationsPassed')}</p>
                  <button 
                    onClick={() => setShowCertificate(true)}
                    className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
                  >
                    <CertificateIcon className="h-6 w-6" />
                    {t('viewCertificate')}
                  </button>
                </>
              ) : (
                <p className="text-yellow-400 mt-2">{t('passingScoreInfo', { score: PASSING_SCORE })}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {showCertificate && (
        <Certificate 
          user={user}
          course={course}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </>
  );
};

export default CourseView;