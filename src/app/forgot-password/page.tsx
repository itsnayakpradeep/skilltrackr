"use client";
import { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim()) {
            setError("Email is required");
            return;
        }
        
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        
        setError("");
        setLoading(true);

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Failed to send reset email');
                return;
            }

            setEmailSent(true);
            toast.success(data.message || 'Password reset email sent successfully!');
            
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }   
    };

    if (emailSent) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 text-center">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/SkillTrackrlogo.svg"
                            alt="SkillTrackr Logo"
                            width={140}
                            height={40}
                            className="object-contain"
                            priority
                        />
                    </div>
                    
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">Check Your Email</h2>
                        <p className="text-gray-600">
                            We've sent a password reset link to <span className="font-semibold text-blue-600">{email}</span>
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Didn't receive the email? Check your spam folder or try again in a few minutes.
                        </p>
                        
                        <button
                            onClick={() => {
                                setEmailSent(false);
                                setEmail("");
                            }}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Try Another Email
                        </button>
                        
                        <Link 
                            href="/login" 
                            className="block text-center text-blue-600 hover:text-blue-500 font-medium"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/SkillTrackrlogo.svg"
                        alt="SkillTrackr Logo"
                        width={140}
                        height={40}
                        className="object-contain"
                        priority
                    />
                </div>
                
                <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Forgot Password
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Enter your email address and we'll send you a link to reset your password
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError("");
                            }}
                            placeholder="Enter your email address"
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50/50 backdrop-blur-sm ${
                                error ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <Link 
                        href="/login" 
                        className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                    >
                        Back to Login
                    </Link>
                </div>
                
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                        Having trouble? <a href="/contact" className="text-blue-600 hover:text-blue-500">Contact support</a>
                    </p>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
