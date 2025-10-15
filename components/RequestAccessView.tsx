import React from 'react';
import { LockIcon } from './IconComponents';
import { useTranslation } from '../useTranslation';

interface RequestAccessViewProps {
    onEnterCodeClick: () => void;
}

const RequestAccessView: React.FC<RequestAccessViewProps> = ({ onEnterCodeClick }) => {
    const t = useTranslation();
    const email1 = "goolleh1@gmail.com";
    const email2 = "somlegal11@outlook.com";

    return (
        <div className="text-center max-w-2xl mx-auto p-10 bg-gray-800 rounded-2xl shadow-xl animate-fade-in">
            <LockIcon className="h-12 w-12 text-yellow-400 mx-auto" />
            <h3 className="text-3xl font-bold mt-4 text-yellow-300">{t('trialExpired')}</h3>
            <p className="text-gray-300 mt-4 mb-6">
                {t('requestAccessInstruction')}
            </p>
            <div className="my-4 space-y-2">
                <a href={`mailto:${email1}`} className="font-mono text-cyan-400 block hover:underline">{email1}</a>
                <span className="text-gray-400">{t('and')}</span>
                <a href={`mailto:${email2}`} className="font-mono text-cyan-400 block hover:underline">{email2}</a>
            </div>
             <a 
                href={`mailto:${email1},${email2}?subject=Geeddi App Full Access Request`}
                className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
             >
                {t('requestAccessCTA')}
            </a>
            <div className="mt-8">
                <p className="text-gray-400">{t('alreadyHaveCode')}</p>
                 <button onClick={onEnterCodeClick} className="mt-2 text-green-400 font-semibold hover:text-green-300">
                    {t('enterCodeHere')} &rarr;
                </button>
            </div>
        </div>
    );
};

export default RequestAccessView;