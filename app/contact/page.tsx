"use client";

import { useState } from "react";
import { FormEvent } from "react";

function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name");
        const email = formData.get("email");
        const phoneNumber = formData.get("phoneNumber");
        const message = formData.get("message");

        const response = await fetch("/api/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, phoneNumber, message }),
        });

        if (response.ok) {
            alert("Message sent successfully!");
            setSubmitted(true);
        } else {
            alert("Failed to send message.");
            setSubmitted(false);
        }
    };

    return (
        <>
            <title>Contact Us - Baobab</title>
            <div className="my-20 mx-auto flex-1 items-start justify-center px-6 sm:px-8 md:px-12 lg:w-2/3 xl:w-1/2 w-full max-w-lg h-auto py-16 rounded-3xl bg-slate-200 shadow-lg">
                <h1 className="text-4xl sm:text-5xl font-bold text-center pb-4">
                    CONTACT US
                </h1>
                <p className="text-center font-normal">
                    Reach out for personalized solutions
                </p>
                <form className="space-y-6 py-6" onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Name"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        className="block mt-6 h-24 w-full border-b-2 border-orange-950 p-2 bg-transparent"
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="block w-2/3 sm:w-1/2 bg-cyan-600 text-white px-4 py-3 mx-auto cursor-pointer hover:bg-amber-500 rounded-xl"
                    />
                </form>
            </div>
            {submitted && (
                <p className="text-center font-bold text-xl text-black my-12">
                    Thank you for contacting us!
                </p>
            )}
        </>
    );
}

export default Contact;
