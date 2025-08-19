"use client";
import { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const newErrors = {
            email: "",
            password: ""
        };
        
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
            const result = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error(result.error || 'Login failed');
                return;
            }

            toast.success('Login successful! Redirecting...');
            
            // Reset form on success
            setForm({ email: "", password: "" });
            setErrors({ email: "", password: "" });
            
            // Redirect to dashboard
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
            
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

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: "/dashboard" });
    };

    const handleGitHubLogin = () => {
        signIn("github", { callbackUrl: "/dashboard" });
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
                    Welcome Back
                </h2>
                <p className="text-center text-gray-600 mb-8">Sign in to your SkillTrackr account</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => {
                                setForm({...form, email: e.target.value});
                                if (errors.email) setErrors({...errors, email: ""});
                            }}
                            placeholder="Email Address"
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50/50 backdrop-blur-sm ${
                                errors.email ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
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
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50/50 backdrop-blur-sm ${
                                errors.password ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                            Forgot password?
                        </a>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
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
                            onClick={handleGoogleLogin}
                            className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
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
                            onClick={handleGitHubLogin}
                            className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
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
                    Don&rsquo;t have an account?{' '}
                    <a href="/signup" className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700">
                        Sign up here
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
