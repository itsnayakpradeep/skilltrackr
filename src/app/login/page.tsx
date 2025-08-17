"use client";
import { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { colors } from "@styles/token/colors";
import { typography } from "@styles/token/typography";

export default function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Login failed');
                return;
            }

            toast.success(data.message || 'Login successful!');

            // Reset form on success
            setForm({ email: "", password: "" });

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

    return (
        <div className={`flex items-center justify-center min-h-screen bg-gray-100 pt-10 font-${typography.fontFamily.primary}`}>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/SkillTrackrlogo.svg"
                        alt="SkillTrackr-Logo"
                        width={140}
                        height={40}
                        className="object-contain"
                        priority
                    />
                </div>
                <h2 className={`text-2xl font-bold mb-6 text-center font-${typography.fontFamily.secondary}`}>
                    Log in to your account
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                        type="email"
                        value={form.email}
                        placeholder="Email"
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        className={`mt-1 block w-full font-${typography.fontFamily.secondary} border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[${colors.primaryHover}] focus:ring-2 focus:ring-[${colors.primaryHover}] focus:ring-opacity-50 transition duration-200 text-[${colors.primary}] placeholder-gray-400`}
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                        type="password"
                        value={form.password}
                        placeholder="Password"
                        onChange={(e) => setForm({...form, password: e.target.value})}
                        className={`mt-1 block w-full font-${typography.fontFamily.secondary} border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[${colors.primaryHover}] focus:ring-2 focus:ring-[${colors.primaryHover}] focus:ring-opacity-50 transition duration-200 text-[${colors.primary}] placeholder-gray-400`}
                        required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={`w-full font-${typography.fontFamily.secondary} bg-primary hover:bg-primaryHover shadow-md hover:shadow-lg text-white p-2 rounded disabled:opacity-50 transition duration-200`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className={`font-${typography.fontFamily.secondary}`}>Or log in with</p>
                    <button 
                        className={`mt-2 w-full bg-white shadow-md hover:shadow-lg text-red-600 p-2 rounded flex items-center justify-center transition-shadow duration-200 font-${typography.fontFamily.secondary}`}
                    >
                        <Image src="/icons/google-icon.svg" alt="Google Icon" width={20} height={20} className="mr-2" />
                        Log in with Google
                    </button>
                    <button 
                        className={`mt-2 w-full bg-white shadow-md hover:shadow-lg text-gray-800 p-2 rounded flex items-center justify-center transition-shadow duration-200 font-${typography.fontFamily.secondary}`}
                    >
                        <Image src="/icons/github-icon.svg" alt="GitHub Icon" width={20} height={20} className="mr-2" />
                        Log in with GitHub
                    </button>
                </div>
                <p className={`mt-4 text-center font-${typography.fontFamily.secondary}`}>
                Don't have an account? <a href="/signup" className={`text-blue-600 font-${typography.fontFamily.secondary}`}>Sign up</a>
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
