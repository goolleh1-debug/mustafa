import React from 'react';
import { AppStoreIcon, GooglePlayIcon, LightbulbIcon, ZapIcon, GlobeIcon, StarIcon, BrainIcon } from './IconComponents';
import { useTranslation } from '../useTranslation';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const t = useTranslation();

  return (
    <div className="bg-gray-900 text-white animate-fade-in">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-6">
            <BrainIcon />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
            {t('heroTitle')}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            {t('heroSubtitle')}
          </p>
          <div className="mt-8">
            <button
              onClick={onEnterApp}
              className="px-8 py-4 bg-cyan-600 text-white font-bold rounded-lg text-lg hover:bg-cyan-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >
              {t('startLearningNow')}
            </button>
          </div>
          <div className="mt-12 flex justify-center items-center gap-4">
             <AppStoreIcon />
             <GooglePlayIcon />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t('whyGeeddiTitle')}</h2>
            <p className="text-gray-400 mt-2">{t('whyGeeddiSubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-800 rounded-xl animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="flex justify-center mb-4"><ZapIcon /></div>
              <h3 className="text-xl font-semibold mb-2">{t('feature1Title')}</h3>
              <p className="text-gray-400">{t('feature1Desc')}</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="flex justify-center mb-4"><LightbulbIcon /></div>
              <h3 className="text-xl font-semibold mb-2">{t('feature2Title')}</h3>
              <p className="text-gray-400">{t('feature2Desc')}</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="flex justify-center mb-4"><GlobeIcon /></div>
              <h3 className="text-xl font-semibold mb-2">{t('feature3Title')}</h3>
              <p className="text-gray-400">{t('feature3Desc')}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t('testimonialsTitle')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
              </div>
              <p className="text-gray-300 mb-4">{t('testimonial1Text')}</p>
              <p className="font-semibold text-white">- Alex Johnson</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
              </div>
              <p className="text-gray-300 mb-4">{t('testimonial2Text')}</p>
              <p className="font-semibold text-white">- Maria Garcia</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
              </div>
              <p className="text-gray-300 mb-4">{t('testimonial3Text')}</p>
              <p className="font-semibold text-white">- David Chen</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
