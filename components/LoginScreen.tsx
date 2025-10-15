import React, { useState } from 'react';
import { User } from '../types';
import { BrainIcon } from './IconComponents';
import { useTranslation } from '../useTranslation';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const t = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin({
        name: t('demoUser'),
        email,
      });
    }
  };

  const handleGuestLogin = () => {
    onLogin({
      name: t('guest'),
      email: '',
      isGuest: true,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl">
        <div className="text-center">
            <div className="flex justify-center mb-4">
               <BrainIcon />
            </div>
          <h1 className="text-3xl font-extrabold text-cyan-400">{t('welcomeToGeeddi')}</h1>
          <p className="mt-2 text-gray-400">{t('loginTagline')}</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">{t('emailAddress')}</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                placeholder={t('emailAddress')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-colors duration-300"
            >
              {t('signInAndStartLearning')}
            </button>
          </div>
        </form>
        
        <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-500">{t('or')}</span>
            </div>
        </div>
        
        <div>
            <button
              type="button"
              onClick={handleGuestLogin}
              className="group relative w-full flex justify-center py-3 px-4 border border-gray-600 text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-colors duration-300"
            >
              {t('continueAsGuest')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;