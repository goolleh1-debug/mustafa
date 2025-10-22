
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Course, GeneratedCourseContent, CourseProgress, CourseFormat } from '../types';
import { generateCourseContent, generateSpeech, RateLimitError } from '../services/geminiService';
import { 
  getCachedCourseContent, 
  cacheCourseContent, 
  addDownloadedCourseId,
  cacheCourseAudio,
  getCachedCourseAudio
} from '../services/userService';
import { 
  LoadingSpinner, 
  CheckCircleIcon, 
  CertificateIcon,
  BookOpenIcon,
  ClipboardListIcon,
  QuestionMarkCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from './IconComponents';
import Certificate from './Certificate';
import { useTranslation } from '../useTranslation';
import { decode, createWavBlob } from '../utils/audioUtils';

interface CourseViewProps {
  course: Course;
  userName: string;
  onBack: () => void;
  initialProgress: CourseProgress | undefined;
  onSaveProgress: (courseId: string, progress: CourseProgress) => void;
  onCourseDownloaded: (courseId: string) => void;
}

const PASSING_SCORE = 75;

const CourseView: React.FC<CourseViewProps> = ({ course, userName, onBack, initialProgress, onSaveProgress, onCourseDownloaded }) => {
  const [content, setContent] = useState<GeneratedCourseContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);
  const t = useTranslation();
  
  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>(() => initialProgress?.quizAnswers || {});
  const [showResults, setShowResults] = useState<boolean>(() => initialProgress?.quizSubmitted || false);
  const [quizScore, setQuizScore] = useState<number>(() => initialProgress?.quizScore ?? -1);

  // Stepper State
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => new Set(initialProgress?.completedSteps || []));
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = useMemo(() => {
    if (!content) return [];
    
    const moduleSteps = content.modules.map((module, index) => ({
      index: index + 1,
      title: module.title,
      icon: <ClipboardListIcon className="h-5 w-5 text-gray-400" />
    }));
    
    return [
      { index: 0, title: t('introduction'), icon: <BookOpenIcon className="h-5 w-5 text-gray-400" /> },
      ...moduleSteps,
      { index: content.modules.length + 1, title: t('summary'), icon: <BookOpenIcon className="h-5 w-5 text-gray-400" /> },
      { index: content.modules.length + 2, title: t('quiz'), icon: <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" /> }
    ];
  }, [content, t]);

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setAudioUrl(null);
    setLoadingMessage(t('generatingCourse'));
    
    try {
      let fetchedContent = await getCachedCourseContent(course.id);
      
      if (!fetchedContent) {
        const timeouts: number[] = [];
        if (course.format === CourseFormat.VIDEO || course.format === CourseFormat.AUDIO) {
            timeouts.push(window.setTimeout(() => setLoadingMessage(t('creatingModules')), 2000));
            timeouts.push(window.setTimeout(() => setLoadingMessage(t('craftingQuiz')), 4000));
        }
        
        const handleRetry = (attempt: number, max: number, seconds: number) => {
          setLoadingMessage(t('apiRetryMessage', { seconds, attempt, max }));
        };

        fetchedContent = await generateCourseContent(course.title, course.format, handleRetry);
        timeouts.forEach(clearTimeout);

        await cacheCourseContent(course.id, fetchedContent);
        addDownloadedCourseId(course.id);
        onCourseDownloaded(course.id);
      }
      
      setContent(fetchedContent);

      if (course.format === CourseFormat.AUDIO && fetchedContent) {
        setIsAudioLoading(true);
        setLoadingMessage(t('generatingAudio'));
        const cachedAudio = await getCachedCourseAudio(course.id);
        if (cachedAudio) {
            setAudioUrl(URL.createObjectURL(cachedAudio));
        } else {
            const fullScript = [
              fetchedContent.introduction,
              ...fetchedContent.modules.map(m => `${m.title}. ${m.content}`),
              fetchedContent.summary
            ].join('\n\n');
            const audioData = await generateSpeech(fullScript);
            const decodedPcm = decode(audioData);
            const wavBlob = createWavBlob(decodedPcm);
            await cacheCourseAudio(course.id, wavBlob);
            setAudioUrl(URL.createObjectURL(wavBlob));
        }
        setIsAudioLoading(false);
      }

    } catch (err) {
      if (err instanceof RateLimitError) {
        setError(t('apiRateLimitError'));
      } else {
        setError(err instanceof Error ? err.message : t('unknownError'));
      }
      setIsAudioLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [course.id, course.title, course.format, t, onCourseDownloaded]);

  useEffect(() => {
    fetchContent();
    return () => { if(audioUrl) { URL.revokeObjectURL(audioUrl); } }
  }, [fetchContent, audioUrl]);

  // Set initial step based on progress
  useEffect(() => {
    if (!isLoading && content) {
      const initialCompleted = new Set(initialProgress?.completedSteps || []);
      for (let i = 0; i < steps.length; i++) {
        if (!initialCompleted.has(i)) {
          setCurrentStep(i);
          return;
        }
      }
      setCurrentStep(initialProgress?.quizSubmitted ? steps.length - 1 : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, content]);

  // Update completed steps when current step changes
  useEffect(() => {
    setCompletedSteps(prev => new Set(prev).add(currentStep));
  }, [currentStep]);

  // Save progress
  useEffect(() => {
    if (isLoading || !content) return;

    const totalSteps = steps.length;
    const answeredCount = Object.keys(selectedAnswers).length;
    const totalQuestions = content.quiz.length;
    const quizProgress = totalQuestions > 0 ? (answeredCount / totalQuestions) : 0;
    
    let progressPercentage = 0;
    if (totalSteps > 0) {
        const stepsCompleted = completedSteps.size;
        const quizStepIndex = steps.length - 1;
        // Progress is based on steps completed. If we are on the quiz step, add quiz answer progress.
        const baseProgress = ((stepsCompleted - (completedSteps.has(quizStepIndex) ? 1 : 0)) / (totalSteps-1)) * 100;
        progressPercentage = completedSteps.has(quizStepIndex) ? baseProgress * 0.9 + quizProgress * 10 : baseProgress;
    }
    
    const newProgress: CourseProgress = {
      quizAnswers: selectedAnswers,
      quizSubmitted: showResults,
      quizScore: quizScore >= 0 ? quizScore : undefined,
      progressPercentage: showResults ? 100 : Math.round(progressPercentage),
      completedSteps: Array.from(completedSteps),
    };
    onSaveProgress(course.id, newProgress);

  }, [completedSteps, selectedAnswers, showResults, quizScore, course.id, content, isLoading, onSaveProgress, steps.length]);
  
  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };
  
  const submitQuiz = () => {
    if (!content) return;
    const score = Math.round((content.quiz.reduce((count, q, i) => count + (selectedAnswers[i] === q.correctAnswer ? 1 : 0), 0) / content.quiz.length) * 100);
    setQuizScore(score);
    setShowResults(true);
  };

  const handleNext = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
  const handlePrev = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const getNextButtonText = () => {
    if (!content) return t('next');
    const quizStepIndex = content.modules.length + 2;
    if (currentStep === quizStepIndex - 1) return t('startQuiz');
    return t('next');
  };

  const renderMedia = () => {
    if (course.format === CourseFormat.VIDEO) {
      return <div className="aspect-w-16 aspect-h-9 mb-8 bg-black rounded-lg overflow-hidden shadow-lg"><iframe src="https://www.youtube.com/embed/S_QyEZ8v1F4?si=PZ1b98p-Fk0L-8Uu" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe></div>
    }
    if (course.format === CourseFormat.AUDIO) {
      return <div className="mb-8 bg-gray-800 p-4 rounded-lg shadow-lg">{isAudioLoading ? <div className="flex items-center justify-center p-4"><LoadingSpinner /><p className="ml-4 text-gray-300">{loadingMessage || t('generatingAudio')}</p></div> : <audio controls className="w-full" src={audioUrl || ''}>{t('browserNoSupportAudio')}</audio>}</div>
    }
    return null;
  }

  const renderStepContent = () => {
    if (!content) return null;
    const quizStepIndex = steps.length - 1;
    const summaryStepIndex = steps.length - 2;

    if (currentStep === 0) { // Introduction
      return <>
        <h3 className="text-3xl font-bold text-cyan-400 mb-4">{t('introduction')}</h3>
        {renderMedia()}
        <p className="text-lg text-gray-300 whitespace-pre-wrap leading-relaxed">{content.introduction}</p>
      </>;
    }
    if (currentStep > 0 && currentStep <= content.modules.length) { // Modules
      const module = content.modules[currentStep - 1];
      return <div key={currentStep}>
          <div className="flex justify-between items-center mb-3">
              <h3 className="text-3xl font-bold text-cyan-400">{module.title}</h3>
              <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">{module.estimatedTime}</span>
          </div>
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{module.content}</p>
      </div>;
    }
    if (currentStep === summaryStepIndex) { // Summary
      return <>
        <h3 className="text-3xl font-bold text-cyan-400 mb-4">{t('summary')}</h3>
        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{content.summary}</p>
        {content.sources && content.sources.length > 0 && (
            <div className="bg-gray-900/50 p-6 rounded-lg mt-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">{t('sources')}</h3>
                <ul className="list-disc list-inside space-y-2">
                    {content.sources.map((s, i) => <li key={i} className="text-gray-300"><a href={s.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline hover:text-cyan-300 break-all">{s.title || s.uri}</a></li>)}
                </ul>
            </div>
        )}
      </>;
    }
    if (currentStep === quizStepIndex) { // Quiz
      return <>
        <h3 className="text-3xl font-bold text-cyan-400 mb-6">{t('testYourKnowledge')}</h3>
        <div className="space-y-6">
          {content.quiz.map((q, i) => {
            const isCorrect = showResults && selectedAnswers[i] === q.correctAnswer;
            const isWrong = showResults && selectedAnswers[i] && selectedAnswers[i] !== q.correctAnswer;
            return <div key={i} className={`p-4 rounded-md ${isCorrect ? 'bg-green-900/50' : ''} ${isWrong ? 'bg-red-900/50' : ''}`}>
              <p className="font-semibold text-lg mb-4">{i + 1}. {q.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[i] === opt;
                  let btnClass = 'text-left w-full p-3 rounded-md transition-colors bg-gray-700 hover:bg-gray-600';
                  if (showResults) {
                    if (opt === q.correctAnswer) btnClass += ' bg-green-700 text-white';
                    else if (isSelected) btnClass += ' bg-red-700 text-white';
                  } else if (isSelected) {
                    btnClass += ' bg-cyan-600 text-white';
                  }
                  return <button key={optIdx} onClick={() => !showResults && handleAnswerSelect(i, opt)} disabled={showResults} className={btnClass}>{opt}</button>;
                })}
              </div>
              {showResults && !isCorrect && <p className="text-sm mt-3 text-yellow-400">{t('correctAnswer')}: {q.correctAnswer}</p>}
            </div>;
          })}
        </div>
        {!showResults && <button onClick={submitQuiz} className="mt-8 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">{t('submitAnswers')}</button>}
        {showResults && (
          <div className="mt-8 text-center p-6 bg-gray-900 rounded-lg">
            <h4 className="text-2xl font-bold text-white">{t('yourScore')}: <span className={quizScore >= PASSING_SCORE ? 'text-green-400' : 'text-red-400'}>{quizScore}%</span></h4>
            {quizScore >= PASSING_SCORE ? (
              <>
                <p className="text-green-400 mt-2 font-semibold">{t('congratulationsPassed')}</p>
                <button onClick={() => setShowCertificate(true)} className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"><CertificateIcon className="h-6 w-6" />{t('viewCertificate')}</button>
              </>
            ) : <p className="text-yellow-400 mt-2">{t('passingScoreInfo', { score: PASSING_SCORE })}</p>}
          </div>
        )}
      </>;
    }
    return null;
  }

  if (isLoading) {
    return <div className="text-center py-20"><div className="flex justify-center items-center"><LoadingSpinner /></div><p className="mt-4 text-lg text-gray-400">{loadingMessage}</p></div>;
  }

  if (error) {
    return <div className="text-center py-20 bg-red-900/20 p-8 rounded-lg"><h3 className="text-2xl font-bold text-red-400">{t('failedToLoadCourse')}</h3><p className="text-red-300 mt-2">{error}</p><button onClick={onBack} className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">{t('backToDashboard')}</button></div>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto animate-fade-in">
        <button onClick={onBack} className="mb-4 text-cyan-400 hover:text-cyan-300 font-semibold">
          &larr; {t('backToDashboard')}
        </button>
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-3xl font-extrabold text-white">{course.title}</h2>
          </div>
          
          <div className="flex flex-col md:flex-row min-h-[60vh]">
            <nav className="w-full md:w-1/4 bg-gray-900/30 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-700">
              <h3 className="font-bold text-lg mb-4 text-white hidden md:block">{t('courseOutline')}</h3>
              <ul>
                {steps.map(step => {
                  const isCompleted = completedSteps.has(step.index);
                  const isCurrent = currentStep === step.index;
                  return (
                    <li key={step.index} className="mb-2">
                      <button
                        onClick={() => setCurrentStep(step.index)}
                        className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isCurrent ? 'bg-cyan-600 text-white shadow-md' : 'hover:bg-gray-700 text-gray-300'}`}
                      >
                        {isCompleted ? <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" /> : <div className="w-5 h-5 flex-shrink-0">{step.icon}</div>}
                        <span className="flex-grow text-sm font-medium">{step.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <main className="w-full md:w-3/4 p-6 md:p-8 flex flex-col">
              <div className="flex-grow">
                {renderStepContent()}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                  {t('previous')}
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  { getNextButtonText() }
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
      {showCertificate && <Certificate userName={userName} course={course} onClose={() => setShowCertificate(false)} />}
    </>
  );
};

export default CourseView;