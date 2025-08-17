"use client";
import { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
        
        // Name validation
        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        } else if (form.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        } else if (form.name.length > 50) {
            newErrors.name = "Name must be less than 50 characters";
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        // Password validation
        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(form.password)) {
            newErrors.password = "Password must contain uppercase, lowercase, number and special character";
        }
        
        // Confirm password validation
        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (form.password !== form.confirmPassword) {
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
        
        setLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    password: form.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Sign-up failed');
                return;
            }

            toast.success(data.message || 'Sign-up successful! Redirecting to login...');
            
            // Reset form on success
            setForm({ name: "", email: "", password: "", confirmPassword: "" });
            setErrors({ name: "", email: "", password: "", confirmPassword: "" });
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
            
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

    const handleGoogleSignUp = () => {
        // Implement Google OAuth
        window.location.href = '/api/auth/google';
    };

    const handleGitHubSignUp = () => {
        // Implement GitHub OAuth
        window.location.href = '/api/auth/github';
    };

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
                    Create a new account
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => {
                                setForm({...form, name: e.target.value});
                                if (errors.name) setErrors({...errors, name: ""});
                            }}
                            placeholder="Full Name"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                            maxLength={50}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => {
                                setForm({...form, email: e.target.value});
                                if (errors.email) setErrors({...errors, email: ""});
                            }}
                            placeholder="Email Address"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => {
                                setForm({...form, password: e.target.value});
                                if (errors.password) setErrors({...errors, password: ""});
                            }}
                            placeholder="Password"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    
                    <div>
                        <input
                            type="password"
                            value={form.confirmPassword}
                            onChange={(e) => {
                                setForm({...form, confirmPassword: e.target.value});
                                if (errors.confirmPassword) setErrors({...errors, confirmPassword: ""});
                            }}
                            placeholder="Confirm Password"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                                errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {loading ? 'Creating Account...' : 'Sign up'}
                    </button>
                </form>
                
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            onClick={handleGoogleSignUp}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <Image
                                src="/icons/google-icon.svg"
                                alt="Google"
                                width={20}
                                height={20}
                                className="mr-2"
                            />
                            Google
                        </button>
                        
                        <button
                            onClick={handleGitHubSignUp}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <Image
                                src="/icons/github-icon.svg"
                                alt="GitHub"
                                width={20}
                                height={20}
                                className="mr-2"
                            />
                            GitHub
                        </button>
                    </div>
                </div>
                
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700">
                        Log in
                    </a>
                </p>
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
