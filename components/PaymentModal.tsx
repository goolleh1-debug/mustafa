import React, { useState, useEffect, useRef, memo } from 'react';
import { User } from '../types';
import { LoadingSpinner, CheckCircleIcon } from './IconComponents';

// This is a global type from the PayPal script, declare it to satisfy TypeScript
declare global {
    interface Window {
        paypal: any;
    }
}

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
    const paypalButtonContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && paymentState === 'idle' && !user.isGuest && window.paypal && paypalButtonContainer.current) {
            // Clear any existing buttons to prevent duplicates
            paypalButtonContainer.current.innerHTML = '';
            
            window.paypal.Buttons({
                createOrder: (data: any, actions: any) => {
                    return actions.order.create({
                        purchase_units: [{
                            description: `Lifetime access to the "${courseTitle}" course on Geeddi`,
                            amount: {
                                value: '9.99', // Fixed price for demonstration
                                currency_code: 'USD'
                            },
                            payee: {
                                email_address: 'ciwaankamustafa@gmail.com' // User-provided PayPal email
                            }
                        }]
                    });
                },
                onApprove: async (data: any, actions: any) => {
                    setPaymentState('processing');
                    try {
                        const order = await actions.order.capture();
                        console.log('Payment successful:', order);
                        setPaymentState('success');
                        onConfirm();

                        setTimeout(() => {
                            onClose();
                            setTimeout(() => setPaymentState('idle'), 300); // Reset state after closing
                        }, 2000); // Show success message for 2s
                    } catch(err) {
                        console.error('Failed to capture payment:', err);
                        setPaymentState('idle'); // Return to idle on capture failure
                    }
                },
                onError: (err: any) => {
                    console.error('PayPal Checkout Error:', err);
                    setPaymentState('idle'); // Return to idle on error
                }
            }).render(paypalButtonContainer.current).catch((err: any) => {
                console.error('Failed to render PayPal buttons:', err);
            });
        }
    }, [isOpen, paymentState, user.isGuest, courseTitle, onConfirm, onClose]);
    
    // Reset state when modal is closed to ensure it's fresh on reopen
    useEffect(() => {
        if (!isOpen) {
            setPaymentState('idle');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const renderContent = () => {
        switch (paymentState) {
            case 'processing':
                return (
                    <div className="text-center">
                        <LoadingSpinner />
                        <h3 className="text-2xl font-bold mt-4">Processing Payment...</h3>
                        <p className="text-gray-400 mt-2">Finalizing your purchase. Please wait.</p>
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
                        <p className="text-center text-gray-300 mt-2 mb-6">You are purchasing access to <span className="font-bold text-white">{courseTitle}</span> for <span className="font-bold text-white">$9.99</span>.</p>
                        
                        <div className="min-h-[100px]" ref={paypalButtonContainer}>
                           {/* PayPal buttons will render here. Show a spinner as a fallback while the SDK loads. */}
                            <div className="text-center pt-8">
                                <LoadingSpinner />
                                <p className="text-sm text-gray-400 mt-2">Loading payment options...</p>
                            </div>
                        </div>

                        <button onClick={onClose} className="mt-2 w-full text-center text-sm text-gray-400 hover:text-white transition-colors">
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

export default memo(PaymentModal);