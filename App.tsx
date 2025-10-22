import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { User, Course, View, CourseProgress, UserData, CourseTier, CourseFormat } from './types';
import { COURSES } from './constants';
import { loginUser, saveCourseProgress as saveProgress, getUserData, activateUserWithCode } from './services/userService';
import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';
import Header from './components/Header';
import Footer from './components/Footer';
import RequestAccessView from './components/RequestAccessView';
import EnterCodeModal from './components/EnterCodeModal';
import CreateCourseModal from './components/CreateCourseModal';
import { BrainIcon, VideoIcon, AudioIcon, CodeIcon } from './components/IconComponents';
import { useTranslation } from './useTranslation';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const t = useTranslation();

  const handleEnterApp = useCallback(() => {
    setCurrentView(View.LOGIN);
  }, []);

  const handleLogin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    const data = loginUser(loggedInUser);
    setUserData(data);
    setCurrentView(View.DASHBOARD);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setUserData(null);
    setCurrentView(View.LOGIN);
    setSelectedCourseId(null);
  }, []);

  const handleSelectCourse = useCallback((courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView(View.COURSE);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setSelectedCourseId(null);
    setCurrentView(View.DASHBOARD);
  }, []);
  
  const handleSaveCourseProgress = useCallback((courseId: string, progress: CourseProgress) => {
    if (!user || !userData) return;
    const updatedUserData = saveProgress(user, courseId, progress);
    setUserData(updatedUserData);
  }, [user, userData]);

  const handleActivate = (code: string): boolean => {
    if (!user) return false;
    const success = activateUserWithCode(user, code);
    if (success) {
      setUserData(prev => prev ? { ...prev, isFullyActivated: true } : null);
      setIsCodeModalOpen(false);
      return true;
    }
    return false;
  };

  const getIconForCourseFormat = (format: CourseFormat): React.ReactNode => {
    switch (format) {
      case CourseFormat.VIDEO:
        return React.createElement(VideoIcon);
      case CourseFormat.AUDIO:
        return React.createElement(AudioIcon);
      case CourseFormat.TEXT:
      default:
        return React.createElement(CodeIcon);
    }
  };

  const handleCreateCourse = (topic: string, format: CourseFormat) => {
    const newCourse: Course = {
        id: `custom-${Date.now()}`,
        title: topic,
        description: t('aiGeneratedCourseDescription', { topic }),
        tier: CourseTier.FREE,
        format,
        icon: getIconForCourseFormat(format),
    };
    setCourses(prevCourses => [...prevCourses, newCourse]);
    setIsCreateCourseModalOpen(false);
  };

  const selectedCourse = useMemo(() => {
    return courses.find(c => c.id === selectedCourseId) || null;
  }, [selectedCourseId, courses]);

  const { isTrialActive, trialDaysRemaining } = useMemo(() => {
    if (!userData) return { isTrialActive: false, trialDaysRemaining: 0 };
    const now = new Date().getTime();
    const signUpDate = new Date(userData.signUpDate).getTime();
    const trialEnd = signUpDate + 14 * 24 * 60 * 60 * 1000;
    const remaining = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
    return {
      isTrialActive: now < trialEnd,
      trialDaysRemaining: Math.max(0, remaining),
    };
  }, [userData]);
  
  const isFullyActivated = userData?.isFullyActivated ?? false;
  const canAccessContent = isTrialActive || isFullyActivated;

  useEffect(() => {
    if(user){
      setUserData(getUserData(user));
    }
  }, [user]);

  const renderContent = () => {
    switch (currentView) {
      case View.LANDING:
        return <LandingPage onEnterApp={handleEnterApp} />;
      case View.LOGIN:
        return <LoginScreen onLogin={handleLogin} />;
      case View.DASHBOARD:
        if (!user) return null;
        if (canAccessContent) {
          return <Dashboard 
                    user={user} 
                    onSelectCourse={handleSelectCourse} 
                    userData={userData}
                    courses={courses}
                    onAddCourse={() => setIsCreateCourseModalOpen(true)}
                 />;
        }
        return <RequestAccessView onEnterCodeClick={() => setIsCodeModalOpen(true)} />;
      case View.COURSE:
        return selectedCourse && user && userData && (
            <CourseView 
              course={selectedCourse}
              user={user}
              onBack={handleBackToDashboard}
              initialProgress={userData.progress[selectedCourse.id]}
              onSaveProgress={handleSaveCourseProgress}
            />
        );
      default:
        return <LandingPage onEnterApp={handleEnterApp} />;
    }
  };
  
  const showHeader = user && currentView !== View.LOGIN && currentView !== View.LANDING;
  const showFooter = currentView === View.LANDING;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {showHeader && (
        <Header 
          user={user} 
          onLogout={handleLogout} 
          isTrialActive={isTrialActive}
          trialDaysRemaining={trialDaysRemaining}
          isFullyActivated={isFullyActivated}
        />
      )}
      <main className="flex-grow">
        {currentView === View.DASHBOARD || currentView === View.COURSE ? (
          <div className="container mx-auto px-4 py-8">
            {renderContent()}
          </div>
        ) : (
          renderContent()
        )}
      </main>
      {showFooter && <Footer />}
      <EnterCodeModal 
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        onActivate={handleActivate}
      />
      <CreateCourseModal
        isOpen={isCreateCourseModalOpen}
        onClose={() => setIsCreateCourseModalOpen(false)}
        onCreate={handleCreateCourse}
      />
    </div>
  );
};

export default App;