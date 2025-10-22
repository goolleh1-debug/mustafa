

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Course, CourseProgress, UserProgress, CourseFormat } from './types';
import { COURSES as INITIAL_COURSES } from './constants';
import { loadProgress, saveCourseProgress as saveProgress, getDownloadedCourseIds, getCachedCourseContent, cacheCourseContent, addDownloadedCourseId, getCachedCourseAudio, cacheCourseAudio } from './services/userService';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';
import Header from './components/Header';
import { useTranslation } from './useTranslation';
import { generateCourseContent, generateSpeech } from './services/geminiService';
import { decode, createWavBlob } from './utils/audioUtils';
import CreateCourseModal from './components/CreateCourseModal';
import { BrainIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [downloadedCourses, setDownloadedCourses] = useState<Set<string>>(new Set());
  const [preparingCourses, setPreparingCourses] = useState<Set<string>>(new Set());
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const t = useTranslation();

  const handleCourseDownloaded = useCallback((courseId: string) => {
    setDownloadedCourses(prev => new Set(prev).add(courseId));
  }, []);

  const precacheCourse = useCallback(async (course: Course) => {
    try {
      setPreparingCourses(prev => new Set(prev).add(course.id));
      
      let content = await getCachedCourseContent(course.id);
      if (!content) {
          content = await generateCourseContent(course.title, course.format);
          await cacheCourseContent(course.id, content);
      }

      if (course.format === CourseFormat.AUDIO) {
        let audio = await getCachedCourseAudio(course.id);
        if (!audio && content) {
            const fullScript = [
              content.introduction,
              ...content.modules.map(m => `${m.title}. ${m.content}`),
              content.summary
            ].join('\n\n');
            const audioData = await generateSpeech(fullScript);
            const decodedPcm = decode(audioData);
            const wavBlob = createWavBlob(decodedPcm);
            await cacheCourseAudio(course.id, wavBlob);
        }
      }

      addDownloadedCourseId(course.id);
      handleCourseDownloaded(course.id);
    } catch (error) {
      console.error(`Failed to pre-cache course ${course.id}:`, error);
    } finally {
      setPreparingCourses(prev => {
        const newSet = new Set(prev);
        newSet.delete(course.id);
        return newSet;
      });
    }
  }, [handleCourseDownloaded]);

  useEffect(() => {
    const initialDownloaded = getDownloadedCourseIds();
    setUserProgress(loadProgress());
    setDownloadedCourses(initialDownloaded);

    const precacheInitialCourses = () => {
      for (const course of INITIAL_COURSES) {
        if (!initialDownloaded.has(course.id)) {
          precacheCourse(course);
        }
      }
    };

    precacheInitialCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [precacheCourse]);
  
  const handleCreateCourse = useCallback(async (topic: string, format: CourseFormat) => {
    setCreateModalOpen(false);
    
    const newCourse: Course = {
      id: `custom-${Date.now()}`,
      title: topic,
      description: `A custom-generated course about ${topic}.`,
      icon: React.createElement(BrainIcon),
      format: format,
    };

    setCourses(prev => [...prev, newCourse]);
    precacheCourse(newCourse);
    
  }, [precacheCourse]);

  const handleSelectCourse = useCallback((courseId: string) => {
    setSelectedCourseId(courseId);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setSelectedCourseId(null);
  }, []);
  
  const handleSaveCourseProgress = useCallback((courseId: string, progress: CourseProgress) => {
    const updatedProgress = saveProgress(courseId, progress);
    setUserProgress(updatedProgress);
  }, []);

  const selectedCourse = useMemo(() => {
    return courses.find(c => c.id === selectedCourseId) || null;
  }, [selectedCourseId, courses]);

  const renderContent = () => {
    if (selectedCourse) {
      return (
        <CourseView 
          course={selectedCourse}
          userName={t('learner')}
          onBack={handleBackToDashboard}
          initialProgress={userProgress[selectedCourse.id]}
          onSaveProgress={handleSaveCourseProgress}
          onCourseDownloaded={handleCourseDownloaded}
        />
      );
    }
    return (
      <Dashboard 
        onSelectCourse={handleSelectCourse} 
        onOpenCreateModal={() => setCreateModalOpen(true)}
        userProgress={userProgress}
        courses={courses}
        downloadedCourses={downloadedCourses}
        preparingCourses={preparingCourses}
      />
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {renderContent()}
        </div>
      </main>
       <CreateCourseModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
        onCreate={handleCreateCourse} 
      />
    </div>
  );
};

export default App;