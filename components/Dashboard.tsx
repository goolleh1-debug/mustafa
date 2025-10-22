

import React, { useState, useMemo } from 'react';
import { UserProgress, Course } from '../types';
import CourseCard from './CourseCard';
import { useTranslation } from '../useTranslation';
import { SearchIcon, PlusIcon } from './IconComponents';

interface DashboardProps {
  onSelectCourse: (courseId: string) => void;
  onOpenCreateModal: () => void;
  userProgress: UserProgress;
  courses: Course[];
  downloadedCourses: Set<string>;
  preparingCourses: Set<string>;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectCourse, onOpenCreateModal, userProgress, courses, downloadedCourses, preparingCourses }) => {
  const t = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const name = useTranslation()('learner');

  const filteredCourses = useMemo(() => {
    if (!searchQuery) {
      return courses;
    }
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  return (
    <div className="animate-fade-in">
      <h2 className="text-4xl font-extrabold mb-2 text-white">{t('welcomeBack', { name })}</h2>
      <p className="text-lg text-gray-400 mb-8">{t('dashboardSubtitle')}</p>
      
      <div className="relative mb-8">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-500" />
        </span>
        <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => {
          const progress = userProgress[course.id]?.progressPercentage || 0;
          const isDownloaded = downloadedCourses.has(course.id);
          const isPreparing = preparingCourses.has(course.id);
          return (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => onSelectCourse(course.id)}
              progress={progress}
              isDownloaded={isDownloaded}
              isPreparing={isPreparing}
            />
          );
        })}

        {/* Add New Course Card */}
        <div
          onClick={onOpenCreateModal}
          className="bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl shadow-lg transform transition-all duration-300 flex flex-col justify-center items-center p-6 text-gray-400 hover:text-white hover:border-cyan-500 cursor-pointer hover:bg-gray-800"
        >
            <PlusIcon />
            <span className="mt-2 font-semibold text-center">{t('createCourseModalTitle')}</span>
        </div>

        {searchQuery && filteredCourses.length === 0 && (
            <div className="md:col-span-2 text-center py-10">
                <p className="text-gray-400">{t('noCoursesFound')}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;