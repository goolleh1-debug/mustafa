import React, { useState } from 'react';
import { CourseFormat } from '../types';
import { useTranslation } from '../useTranslation';

interface CreateCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (topic: string, format: CourseFormat) => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [topic, setTopic] = useState('');
    const [format, setFormat] = useState<CourseFormat>(CourseFormat.TEXT);
    const t = useTranslation();

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (topic.trim()) {
            onCreate(topic.trim(), format);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-lg m-4 transform transition-all animate-slide-up relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center z-10" aria-label="Close">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-cyan-400">{t('createCourseModalTitle')}</h2>
                    <p className="text-gray-400 mt-2 mb-6">{t('createCourseModalPrompt')}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="course-topic" className="block text-sm font-medium text-gray-300 mb-2">{t('courseTopic')}</label>
                        <input
                            id="course-topic"
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder={t('courseTopicPlaceholder')}
                            className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{t('courseFormat')}</label>
                        <div className="grid grid-cols-3 gap-3">
                            {(Object.keys(CourseFormat) as Array<keyof typeof CourseFormat>).map(key => (
                                <div key={key}>
                                    <input 
                                        type="radio" 
                                        id={`format-${key}`} 
                                        name="format" 
                                        value={CourseFormat[key]}
                                        checked={format === CourseFormat[key]}
                                        onChange={() => setFormat(CourseFormat[key])}
                                        className="sr-only"
                                    />
                                    <label
                                        htmlFor={`format-${key}`}
                                        className={`block text-center p-3 rounded-md cursor-pointer transition-colors border-2 ${format === CourseFormat[key] ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
                                    >
                                        {t(`${key.toLowerCase()}Format` as any)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!topic.trim()}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                        {t('createCourseButton')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCourseModal;