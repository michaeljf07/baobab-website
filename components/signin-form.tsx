"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

function SignIn() {
    const [error, setError] = useState("");
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (session.status === "authenticated") {
            router.replace("/wishlists");
        }
    }, [session, router]);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }

        if (!password || password.length < 6) {
            setError("Password is invalid");
        }

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Invalid email or password");
            if (res?.url) router.replace("/wishlists");
        } else {
            setError("");
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
                    <p className="block text-center text-red-600 mx-auto">
                        {error && error}
                    </p>
                </form>
                <div className="text-center mx-auto">
                    <p className="inline-block">
                        Don&apos;t have an account?{" "}
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
