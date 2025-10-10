import React from 'react';
import { Course, CourseTier } from '../types';
import { LockIcon } from './IconComponents';

interface CourseCardProps {
  course: Course;
  isLocked: boolean;
  onClick: () => void;
  progress: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isLocked, onClick, progress }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-xl shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      <div className="p-6 flex-grow flex flex-col">
        <div>
          <div className="flex justify-between items-start">
              {course.icon}
              {course.tier === CourseTier.PREMIUM && (
                  <span className={`flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isLocked ? 'bg-yellow-900 text-yellow-300' : 'bg-green-900 text-green-300'
                  }`}>
                      {isLocked ? <LockIcon className="h-4 w-4 mr-1" /> : null}
                      PREMIUM
                  </span>
              )}
              {course.tier === CourseTier.FREE && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-900 text-cyan-300">
                      FREE
                  </span>
              )}
          </div>
          <h3 className="text-xl font-bold mt-4 text-white">{course.title}</h3>
          <p className="text-gray-400 mt-2 text-sm">{course.description}</p>
        </div>
        
        <div className="mt-auto pt-4">
            <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-gray-400">Progress</span>
                <span className="font-bold text-white">{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
      </div>

      <div className="bg-gray-900/50 px-6 py-3 text-cyan-400 font-semibold text-sm">
        Start Learning &rarr;
      </div>
    </div>
  );
};

export default CourseCard;