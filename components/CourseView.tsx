import React, { useState, useEffect, useCallback } from 'react';
import { Course, GeneratedCourseContent, User, CourseProgress } from '../types';
import { generateCourseContent } from '../services/geminiService';
import { LoadingSpinner, LockIcon } from './IconComponents';
import PaymentModal from './PaymentModal';

interface CourseViewProps {
  course: Course;
  user: User;
  isLocked: boolean;
  onUnlock: (courseId: string) => void;
  onBack: () => void;
  onLogout: () => void;
  initialProgress: CourseProgress | undefined;
  onSaveProgress: (courseId: string, progress: CourseProgress) => void;
}

const CourseView: React.FC<CourseViewProps> = ({ course, user, isLocked, onUnlock, onBack, onLogout, initialProgress, onSaveProgress }) => {
  const [content, setContent] = useState<GeneratedCourseContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>(() => initialProgress?.quizAnswers || {});
  const [showResults, setShowResults] = useState<boolean>(() => initialProgress?.quizSubmitted || false);

  const fetchContent = useCallback(async () => {
    if (isLocked) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const generatedContent = await generateCourseContent(course.title);
      setContent(generatedContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [course.title, isLocked]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    // Don't save progress until content is loaded to avoid incorrect calculations.
    if (isLoading || !content) return;

    const answeredCount = Object.keys(selectedAnswers).length;
    const totalQuestions = content.quiz.length;
    
    // Mark progress as 100% only when the quiz is submitted. Otherwise, it's based on answers.
    const progressPercentage = showResults
      ? 100
      : (totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0);

    const newProgress: CourseProgress = {
      quizAnswers: selectedAnswers,
      quizSubmitted: showResults,
      progressPercentage: progressPercentage,
    };
    onSaveProgress(course.id, newProgress);

  }, [selectedAnswers, showResults, course.id, content, isLoading, onSaveProgress]);

  const handleUnlock = () => {
    onUnlock(course.id);
  };
  
  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };
  
  const submitQuiz = () => {
    setShowResults(true);
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-gray-400">Generating your personalized course...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-900/20 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-red-400">Failed to Load Course</h3>
        <p className="text-red-300 mt-2">{error}</p>
        <button onClick={onBack} className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (isLocked) {
    return (
      <>
        <div className="text-center max-w-2xl mx-auto p-10 bg-gray-800 rounded-2xl shadow-xl animate-fade-in">
            <LockIcon className="h-12 w-12 text-yellow-400 mx-auto" />
            <h3 className="text-3xl font-bold mt-4 text-yellow-300">Premium Course Locked</h3>
            <p className="text-gray-300 mt-2 mb-6">
              This course requires a one-time purchase to unlock all modules and quizzes.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
              Unlock Now
            </button>
            <button onClick={onBack} className="mt-4 block w-full text-center text-cyan-400 hover:text-cyan-300">
              Back to Dashboard
            </button>
        </div>
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleUnlock}
          courseTitle={course.title}
          user={user}
          onLogout={onLogout}
        />
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-8 text-cyan-400 hover:text-cyan-300 font-semibold">
        &larr; Back to Dashboard
      </button>
      <h2 className="text-5xl font-extrabold mb-4 text-white">{course.title}</h2>
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
        <h3 className="text-2xl font-bold text-cyan-400 mb-3">Summary</h3>
        <p className="text-gray-300">{content?.summary}</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg mt-8">
        <h3 className="text-3xl font-bold text-cyan-400 mb-6">Test Your Knowledge</h3>
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
                  <p className="text-sm mt-3 text-yellow-400">Correct Answer: {q.correctAnswer}</p>
                )}
              </div>
            );
          })}
        </div>
        {!showResults && (
            <button onClick={submitQuiz} className="mt-8 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
                Submit Answers
            </button>
        )}
      </div>
    </div>
  );
};

export default CourseView;
