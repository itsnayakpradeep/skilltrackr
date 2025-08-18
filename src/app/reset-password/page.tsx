"use client";
import { useState, Suspense } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: ""
    });
    const [passwordReset, setPasswordReset] = useState(false);

    const validateForm = () => {
        const newErrors = {
            password: "",
            confirmPassword: ""
        };
        
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        if (!token) {
            toast.error("Invalid or expired reset link");
            return;
        }
        
        setLoading(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Failed to reset password');
                return;
            }

            setPasswordReset(true);
            toast.success(data.message || 'Password reset successful!');
            
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

    if (!token) {
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
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">Invalid Reset Link</h2>
                        <p className="text-gray-600">
                            This password reset link is invalid or has expired.
                        </p>
                    </div>
                    
                    <Link 
                        href="/forgot-password" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl block"
                    >
                        Request New Reset Link
                    </Link>
                </div>
            </div>
        );
    }

    if (passwordReset) {
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
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">Password Reset Successful</h2>
                        <p className="text-gray-600">
                            Your password has been successfully reset. You can now sign in with your new password.
                        </p>
                    </div>
                    
                    <Link 
                        href="/login" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl block"
                    >
                        Go to Login
                    </Link>
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
                    Reset Password
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Enter your new password below
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors({...errors, password: ""});
                            }}
                            placeholder="Enter new password"
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50/50 backdrop-blur-sm ${
                                errors.password ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (errors.confirmPassword) setErrors({...errors, confirmPassword: ""});
                            }}
                            placeholder="Confirm new password"
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50/50 backdrop-blur-sm ${
                                errors.confirmPassword ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-10 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mx-auto"></div>
                        <div className="space-y-3">
                            <div className="h-12 bg-gray-200 animate-pulse rounded-xl"></div>
                            <div className="h-12 bg-gray-200 animate-pulse rounded-xl"></div>
                            <div className="h-12 bg-gray-200 animate-pulse rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
