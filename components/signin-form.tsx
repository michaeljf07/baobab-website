"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignIn() {
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            router.push("/profile");
        } else {
            alert("Failed to sign up.");
        }
    }

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
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                        required
                    />
                    <input
                        type="submit"
                        value="Login"
                        className="block w-2/5 text-center bg-cyan-600 text-white px-4 py-3 mx-auto cursor-pointer hover:bg-amber-500 rounded-xl"
                    />
                </form>
                <div className="text-center mx-auto">
                    <p className="inline-block">
                        Don't have an account?{" "}
                        <Link
                            href="/account/signup"
                            className="text-sky-500 underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignIn;
