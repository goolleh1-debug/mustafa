import React from 'react';
import { useTranslation } from '../useTranslation';

const Footer: React.FC = () => {
  const t = useTranslation();
  return (
    <footer className="bg-gray-900/50">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} {t('footerRights')}</p>
        <p className="text-xs mt-1">{t('footerDisclaimer')}</p>
      </div>
    </footer>
  );
};

export default Footer;