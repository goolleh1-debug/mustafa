import React from 'react';
import { User, CourseTier, UserProgress } from '../types';
import { COURSES } from '../constants';
import CourseCard from './CourseCard';

interface DashboardProps {
  user: User;
  onSelectCourse: (courseId: string) => void;
  unlockedCourses: Set<string>;
  userProgress: UserProgress;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSelectCourse, unlockedCourses, userProgress }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-4xl font-extrabold mb-2 text-white">Welcome, {user.name}!</h2>
      <p className="text-lg text-gray-400 mb-8">Choose a topic and start your learning adventure.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map(course => {
          const progress = userProgress[course.id]?.progressPercentage || 0;
          return (
            <CourseCard
              key={course.id}
              course={course}
              isLocked={course.tier === CourseTier.PREMIUM && !unlockedCourses.has(course.id)}
              onClick={() => onSelectCourse(course.id)}
              progress={progress}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
