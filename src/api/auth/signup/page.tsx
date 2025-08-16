"use client";
import { useState } from "react";

export default function SignUpPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Sign-up failed');
            }

            const data = await response.json();
            setSuccess(data.message || 'Sign-up successful!');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center mb-6">SkillTrackr</h1>
                <h2 className="text-2xl font-bold mb-6">Create a new account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        {/* <label className="block text-sm font-medium text-gray-700">Name</label> */}
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                            placeholder="Name"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        {/* <label className="block text-sm font-medium text-gray-700">Email</label> */}
                        <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({...form, email: e.target.value})}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        {/* <label className="block text-sm font-medium text-gray-700">Password</label> */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p>Or sign up with</p>
                    <button className="mt-2 w-full bg-red-600 text-white p-2 rounded">Log in with Google</button>
                    <button className="mt-2 w-full bg-gray-800 text-white p-2 rounded">Log in with GitHub</button>
                </div>
                <p className="mt-4 text-center">
                    Already have an account? <a href="/login" className="text-blue-600">Log in</a>
                </p>
            </div>
        </div>
    );
}
