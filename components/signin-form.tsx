"use client";

import { useState } from "react";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            email,
            password,
        };
    };

    return (
        <>
            <div className="my-20 mx-auto flex-1 items-start justify-center space-x-4 w-1/3 h-auto py-16 px-8 rounded-3xl bg-slate-200 shadow-lg">
                <h1 className="text-5xl font-bold text-center pb-4">Login</h1>
                <p className="text-center font-normal">
                    Sign in to your charity profile
                </p>
                <form className="space-y-6 py-6" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                        value={password}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Login"
                        className="block w-2/5 text-center bg-cyan-600 text-white px-4 py-3 mx-auto cursor-pointer hover:bg-amber-500 rounded-xl"
                    />
                </form>
            </div>
        </>
    );
}

export default SignIn;
