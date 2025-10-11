import React, { useState, useMemo, useCallback } from 'react';
import { User, Course, View, CourseProgress, UserProgress } from './types';
import { COURSES } from './constants';
import { loadUserProgress, saveCourseProgress } from './services/progressService';
import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [unlockedCourses, setUnlockedCourses] = useState<Set<string>>(new Set());
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  
  const handleEnterApp = useCallback(() => {
    setCurrentView(View.LOGIN);
  }, []);

  const handleLogin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView(View.DASHBOARD);
    const loadedProgress = loadUserProgress(loggedInUser);
    setUserProgress(loadedProgress);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setCurrentView(View.LOGIN);
    setSelectedCourseId(null);
    setUserProgress({});
  }, []);

  const handleSelectCourse = useCallback((courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView(View.COURSE);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setSelectedCourseId(null);
    setCurrentView(View.DASHBOARD);
  }, []);

  const handleUnlockCourse = useCallback((courseId: string) => {
    setUnlockedCourses(prev => new Set(prev).add(courseId));
  }, []);
  
  const handleSaveCourseProgress = useCallback((courseId: string, progress: CourseProgress) => {
    if (!user) return;
    saveCourseProgress(user, courseId, progress);
    setUserProgress(prev => ({
      ...prev,
      [courseId]: progress
    }));
  }, [user]);

  const selectedCourse = useMemo(() => {
    return COURSES.find(c => c.id === selectedCourseId) || null;
  }, [selectedCourseId]);

  const renderContent = () => {
    switch (currentView) {
      case View.LANDING:
        return <LandingPage onEnterApp={handleEnterApp} />;
      case View.LOGIN:
        return <LoginScreen onLogin={handleLogin} />;
      case View.DASHBOARD:
        return user && <Dashboard user={user} onSelectCourse={handleSelectCourse} unlockedCourses={unlockedCourses} userProgress={userProgress} />;
      case View.COURSE:
        return selectedCourse && user && (
            <CourseView 
              course={selectedCourse}
              user={user}
              isLocked={selectedCourse.tier === 'PREMIUM' && !unlockedCourses.has(selectedCourse.id)}
              onUnlock={handleUnlockCourse}
              onBack={handleBackToDashboard}
              onLogout={handleLogout}
              initialProgress={userProgress[selectedCourse.id]}
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
        <Header user={user} onLogout={handleLogout} />
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
    </div>
  );
};

export default App;