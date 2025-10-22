import React from 'react';
import { User } from '../types';
import { BrainIcon } from './IconComponents';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../useTranslation';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  isTrialActive: boolean;
  trialDaysRemaining: number;
  isFullyActivated: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, isTrialActive, trialDaysRemaining, isFullyActivated }) => {
  const t = useTranslation();

  const getStatus = () => {
    if(isFullyActivated) {
      return <span className="text-xs text-green-400 font-semibold">{t('fullAccess')}</span>
    }
    if (isTrialActive) {
      return <span className="text-xs text-yellow-400">{t('trialDaysRemaining', { days: trialDaysRemaining })}</span>
    }
    return null;
  }

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
          <div className="text-right">
            <p className="font-semibold text-sm">{user.name}</p>
            {user.isGuest ? (
                 <p className="text-xs text-gray-400">{t('guestAccount')}</p>
            ) : getStatus() }
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
          >
            {t('logout')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;