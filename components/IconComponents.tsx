import React from 'react';

export const BrainIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.871 14.73C3.024 13.25 2 11.2 2 9c0-3.866 3.134-7 7-7s7 3.134 7 7c0 2.2-1.024 4.25-2.871 5.73M12 21v-3.055A4.002 4.002 0 0113.828 14H14a2 2 0 100-4h-.172A4.002 4.002 0 0112 6.055V3M9 10h6M12 3a9 9 0 012.347 17.279M12 3a9 9 0 00-2.347 17.279" />
  </svg>
);

export const CodeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

export const RocketIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export const DnaIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L12 6.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6zM3.293 10.293a1 1 0 010 1.414l6 6a1 1 0 011.414 0l6-6a1 1 0 01-1.414-1.414L12 17.586l-4.293-4.293a1 1 0 010-1.414l-1.414 1.414z" />
    </svg>
);

export const RobotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V5m0 14v-1M9 10h6m-3-3v6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
);

export const NetworkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m4.632 2.684c.202.404.316.86.316 1.342s-.114.938-.316 1.342M9 6a3 3 0 100 6 3 3 0 000-6zm0 0c0-1.657 1.343-3 3-3s3 1.343 3 3zm6 12a3 3 0 100-6 3 3 0 000 6zm0 0c0 1.657-1.343 3-3 3s-3-1.343-3-3m-3-6a3 3 0 100-6 3 3 0 000 6zm0 0c0 1.657 1.343-3 3-3s3 1.343 3 3" />
    </svg>
);

export const LockIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center">
        <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

export const AppStoreIcon: React.FC = () => (
    <svg className="w-40 h-auto" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="100" rx="20" fill="black"/>
      <path d="M56.4 67.3c-2.8-1.5-5.2-2.3-7.2-2.3-2 0-3.7.8-5.1 2.3-1.4 1.5-2.1 3.4-2.1 5.7 0 2.3.8 4.2 2.4 5.7 1.6 1.5 3.5 2.2 5.7 2.2 2.3 0 4.4-.8 6.3-2.3l1.8 1.4c-2.3 2-5.1 3-8.3 3-3.6 0-6.6-1.3-8.9-3.8-2.3-2.5-3.5-5.7-3.5-9.6 0-3.9 1.2-7.1 3.5-9.6 2.3-2.5 5.3-3.8 8.9-3.8 3.2 0 6 1 8.3 3l-1.9 1.5zM89.7 52.4h-5.4v31h5.4V52.4zm-13.8 0h-5.4v31h5.4V52.4zM120.5 78.3c-1.8 1.8-4 2.7-6.6 2.7-2.6 0-4.8-.9-6.6-2.7-1.8-1.8-2.7-4-2.7-6.6s.9-4.8 2.7-6.6c1.8-1.8 4-2.7 6.6-2.7s4.8.9 6.6 2.7c1.8 1.8 2.7 4 2.7 6.6s-.9 4.8-2.7 6.6zm-18.6-25.9h-5.4v31h5.4V52.4zM151.2 78.3c-1.8 1.8-4 2.7-6.6 2.7-2.6 0-4.8-.9-6.6-2.7-1.8-1.8-2.7-4-2.7-6.6s.9-4.8 2.7-6.6c1.8-1.8 4-2.7 6.6-2.7s4.8.9 6.6 2.7c1.8 1.8 2.7 4 2.7 6.6s-.9 4.8-2.7 6.6z" fill="white"/>
      <text x="170" y="65" fontFamily="Arial, sans-serif" fontSize="16" fill="white" textAnchor="middle">
        <tspan x="170" dy="-1.2em" fontWeight="bold">Download on the</tspan>
        <tspan x="170" dy="1.4em" fontSize="24" fontWeight="bold">App Store</tspan>
      </text>
    </svg>
);
  
export const GooglePlayIcon: React.FC = () => (
<svg className="w-40 h-auto" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="100" rx="20" fill="black"/>
    <path d="M50 25L25 50L50 75L68.75 62.5L68.75 37.5L50 25Z" fill="#00E676"/>
    <path d="M78.125 31.25L50 25L68.75 37.5L87.5 50L78.125 31.25Z" fill="#FFC107"/>
    <path d="M78.125 68.75L87.5 50L68.75 62.5L50 75L78.125 68.75Z" fill="#F44336"/>
    <path d="M25 50L50 25V75L25 50Z" fill="#2196F3"/>
    <text x="180" y="65" fontFamily="Arial, sans-serif" fontSize="16" fill="white" textAnchor="middle">
    <tspan x="180" dy="-1.2em">GET IT ON</tspan>
    <tspan x="180" dy="1.4em" fontSize="24" fontWeight="bold">Google Play</tspan>
    </text>
</svg>
);

export const StarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-5 h-5"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const LightbulbIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export const ZapIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

export const GlobeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293a1 1 0 010 1.414L5.414 8h13.172l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L18.586 12H5.414l2.293 2.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
    </svg>
);

export const CertificateIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);