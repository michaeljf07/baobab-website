"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUp() {
    const [error, setError] = useState("");

    const router = useRouter();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const charityName = String(formData.get("charityname"));
        const registrationNumber = String(formData.get("Registration Number"));
        const address = String(formData.get("address"));
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));
        const description = String(formData.get("description"));

        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }

        if (!password || password.length < 6) {
            setError("Password is invalid");
        }

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    charityName,
                    registrationNumber,
                    address,
                    email,
                    password,
                    description,
                }),
            });

            if (res.status === 409) {
                setError("Email is already in use");
            }
            if (res.ok) {
                setError("");
                router.push("/account/signin");
            }
        } catch (error) {
            setError("Error, try again.");
            console.log(error);
        }
    }
    return (
        <>
            <div className="my-20 mx-auto flex-1 items-start justify-center space-x-4 w-1/3 h-auto py-16 px-8 rounded-3xl bg-slate-200 shadow-lg">
                <h1 className="text-5xl font-bold text-center pb-4">SIGN UP</h1>
                <p className="text-center font-normal">
                    ONLY FOR CHARITIES. Donors do not require accounts.
                </p>
                <form className="space-y-6 py-6" onSubmit={handleSubmit}>
                    <input
                        name="charityname"
                        placeholder="Charity Name"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                        required
                    />
                    <input
                        name="Registration Number"
                        placeholder="Registration Number"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                        required
                    />
                    <input
                        name="address"
                        placeholder="Address"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                        required
                    />
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
                        name="description"
                        placeholder="Your One Line Description"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                        required
                    />
                    <input
                        type="submit"
                        value="Create Account"
                        className="block w-2/5 text-center bg-cyan-600 text-white px-4 py-3 mx-auto cursor-pointer hover:bg-amber-500 rounded-xl"
                    />
                    <p className="block text-center text-red-600 mx-auto">
                        {error && error}
                    </p>
                </form>
                <div className="text-center mx-auto">
                    <p className="inline-block">
                        Already have an account?{" "}
                        <Link
                            href="/account/signin"
                            className="text-sky-500 underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignUp;
