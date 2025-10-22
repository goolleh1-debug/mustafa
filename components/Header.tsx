import React from 'react';
import { BrainIcon } from './IconComponents';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../useTranslation';

const Header: React.FC = () => {
  const t = useTranslation();

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BrainIcon />
          <div>
            <h1 className="text-xl font-bold text-cyan-400">Geeddi</h1>
            <p className="text-xs text-gray-400 -mt-1">{t('appSubtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;