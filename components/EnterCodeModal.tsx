import React, { useState } from 'react';
import { useTranslation } from '../useTranslation';

interface EnterCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onActivate: (code: string) => boolean;
}

const EnterCodeModal: React.FC<EnterCodeModalProps> = ({ isOpen, onClose, onActivate }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const t = useTranslation();

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = onActivate(code);
        if (!success) {
            setError(t('invalidCode'));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 transform transition-all animate-slide-up relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center z-10" aria-label="Close">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-cyan-400">{t('enterActivationCode')}</h2>
                    <p className="text-gray-400 mt-2 mb-6">{t('enterCodePrompt')}</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.trim())}
                            placeholder={t('activationCode')}
                            className="text-center tracking-widest font-mono appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-lg"
                        />
                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                        <button
                            type="submit"
                            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                        >
                            {t('activate')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnterCodeModal;