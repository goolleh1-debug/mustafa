import React, { useState } from 'react';
import { User } from '../types';
import { LoadingSpinner, CheckCircleIcon } from './IconComponents';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    courseTitle: string;
    user: User;
    onLogout: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onConfirm, courseTitle, user, onLogout }) => {
    const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success'>('idle');

    if (!isOpen) return null;

    const handlePayment = (method: string) => {
        console.log(`Payment initiated with ${method}`);
        setPaymentState('processing');
        setTimeout(() => {
            setPaymentState('success');
            onConfirm();
            setTimeout(() => {
                onClose();
                // Reset state after a short delay to allow for exit animation
                setTimeout(() => setPaymentState('idle'), 300);
            }, 2000); // Show success message for 2s
        }, 1500); // Simulate processing for 1.5s
    };

    const renderContent = () => {
        switch (paymentState) {
            case 'processing':
                return (
                    <div className="text-center">
                        <LoadingSpinner />
                        <h3 className="text-2xl font-bold mt-4">Processing Payment...</h3>
                        <p className="text-gray-400 mt-2">Please wait, this will only take a moment.</p>
                    </div>
                );
            case 'success':
                return (
                    <div className="text-center">
                        <CheckCircleIcon className="h-16 w-16 text-green-400 mx-auto" />
                        <h3 className="text-3xl font-bold mt-4 text-green-300">Payment Successful!</h3>
                        <p className="text-gray-300 mt-2">Unlocking course content. Enjoy!</p>
                    </div>
                );
            case 'idle':
            default:
                if (user.isGuest) {
                    return (
                        <>
                            <h2 className="text-3xl font-bold text-center text-cyan-400">Create an Account</h2>
                            <p className="text-center text-gray-300 mt-2 mb-6">Please sign up to unlock premium courses and save your progress.</p>
                            <button onClick={onLogout} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                                Sign Up Now
                            </button>
                            <button onClick={onClose} className="mt-4 w-full text-center text-sm text-gray-400 hover:text-white transition-colors">
                                Maybe Later
                            </button>
                        </>
                    );
                }
                return (
                    <>
                        <h2 className="text-3xl font-bold text-center text-cyan-400">Unlock Premium Course</h2>
                        <p className="text-center text-gray-300 mt-2 mb-6">You are purchasing access to <span className="font-bold text-white">{courseTitle}</span>.</p>
                        
                        <div className="space-y-4">
                            <button onClick={() => handlePayment('Email')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                                Pay with Email ({user.email})
                            </button>
                        </div>

                        <button onClick={onClose} className="mt-6 w-full text-center text-sm text-gray-400 hover:text-white transition-colors">
                            Cancel Payment
                        </button>
                    </>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 transform transition-all animate-slide-up">
                {renderContent()}
            </div>
        </div>
    );
};

export default PaymentModal;