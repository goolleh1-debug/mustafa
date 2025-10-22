
import React from 'react';
import { Course, CourseFormat } from '../types';
import { useTranslation } from '../useTranslation';
import { DownloadIcon, LoadingSpinner } from './IconComponents';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  progress: number;
  isDownloaded: boolean;
  isPreparing: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, progress, isDownloaded, isPreparing }) => {
  const t = useTranslation();

  const getFormatTag = () => {
    switch(course.format) {
      case CourseFormat.VIDEO:
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-900 text-red-300">{t('video')}</span>;
      case CourseFormat.AUDIO:
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-900 text-orange-300">{t('audio')}</span>;
      case CourseFormat.TEXT:
         return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-900 text-blue-300">{t('text')}</span>;
      default:
        return null;
    }
  }

  const isClickable = !isPreparing;

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={`bg-gray-800 rounded-xl shadow-lg transform transition-all duration-300 overflow-hidden flex flex-col ${isClickable ? 'hover:shadow-cyan-500/20 hover:-translate-y-2 cursor-pointer' : 'opacity-70'}`}
    >
      <div className="p-6 flex-grow flex flex-col">
        <div>
          <div className="flex justify-between items-start">
              {course.icon}
              <div className="flex items-center gap-2">
                {isDownloaded && !isPreparing && <DownloadIcon className="h-5 w-5 text-green-400" />}
                {getFormatTag()}
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-900 text-cyan-300">{t('free')}</span>
              </div>
          </div>
          <h3 className="text-xl font-bold mt-4 text-white">{course.title}</h3>
          <p className="text-gray-400 mt-2 text-sm">{course.description}</p>
        </div>
        
        <div className="mt-auto pt-4">
            {isPreparing ? (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <LoadingSpinner className="h-5 w-5" />
                    <span>Preparing...</span>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-semibold text-gray-400">{t('progress')}</span>
                        <span className="font-bold text-white">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </>
            )}
        </div>
      </div>

      <div className="bg-gray-900/50 px-6 py-3 text-cyan-400 font-semibold text-sm">
        {isPreparing ? 'Generating with AI...' : t('startLearningArrow')}
      </div>
    </div>
  );
};

export default CourseCard;
