import React, { useState, useMemo } from 'react';
import { User, UserData, Course } from '../types';
import CourseCard from './CourseCard';
import { useTranslation } from '../useTranslation';
import { PlusIcon, SearchIcon } from './IconComponents';

interface DashboardProps {
  user: User;
  onSelectCourse: (courseId: string) => void;
  userData: UserData | null;
  courses: Course[];
  onAddCourse: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSelectCourse, userData, courses, onAddCourse }) => {
  const t = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

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
      <h2 className="text-4xl font-extrabold mb-2 text-white">{t('welcomeBack', { name: user.name })}</h2>
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
        {filteredCourses.length > 0 ? (
            filteredCourses.map(course => {
              const progress = userData?.progress[course.id]?.progressPercentage || 0;
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => onSelectCourse(course.id)}
                  progress={progress}
                />
              );
            })
        ) : (
            <div className="md:col-span-2 lg:col-span-3 text-center py-10">
                <p className="text-gray-400">{t('noCoursesFound')}</p>
            </div>
        )}
        <div
          onClick={onAddCourse}
          className="bg-gray-800 rounded-xl border-2 border-dashed border-gray-600 hover:border-cyan-500 hover:bg-gray-700/50 flex flex-col justify-center items-center p-6 text-center transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        >
          <PlusIcon />
          <h3 className="text-xl font-bold mt-4 text-white">{t('createYourOwnCourse')}</h3>
          <p className="text-gray-400 mt-2 text-sm">{t('createCourseDescription')}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;