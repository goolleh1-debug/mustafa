import React from 'react';
import { useLanguage } from '../useTranslation';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'so' : 'en');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-300 text-sm"
        >
            {language === 'en' ? 'SO' : 'EN'}
        </button>
    );
};

export default LanguageSwitcher;