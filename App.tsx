import React, { useState, useMemo } from 'react';
import { User, Course, View, CourseProgress, UserProgress } from './types';
import { COURSES } from './constants';
import { loadUserProgress, saveCourseProgress } from './services/progressService';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';
import Header from './components/Header';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [unlockedCourses, setUnlockedCourses] = useState<Set<string>>(new Set());
  const [userProgress, setUserProgress] = useState<UserProgress>({});

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView(View.DASHBOARD);
    const loadedProgress = loadUserProgress(loggedInUser);
    setUserProgress(loadedProgress);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.LOGIN);
    setSelectedCourseId(null);
    setUserProgress({});
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView(View.COURSE);
  };

  const handleBackToDashboard = () => {
    setSelectedCourseId(null);
    setCurrentView(View.DASHBOARD);
  };

  const handleUnlockCourse = (courseId: string) => {
    setUnlockedCourses(prev => new Set(prev).add(courseId));
  };
  
  const handleSaveCourseProgress = (courseId: string, progress: CourseProgress) => {
    if (!user) return;
    saveCourseProgress(user, courseId, progress);
    setUserProgress(prev => ({
      ...prev,
      [courseId]: progress
    }));
  };

  const selectedCourse = useMemo(() => {
    return COURSES.find(c => c.id === selectedCourseId) || null;
  }, [selectedCourseId]);

  const renderContent = () => {
    switch (currentView) {
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
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {user && currentView !== View.LOGIN && (
        <Header user={user} onLogout={handleLogout} />
      )}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
