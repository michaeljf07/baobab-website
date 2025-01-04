"use client";

import { useState } from "react";
import { FormEvent } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name");
        const email = formData.get("email");
        const phoneNumber = formData.get("phone-number");
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
            <Navbar />
            <div className="my-20 mx-auto flex-1 items-start justify-center space-x-4 w-1/3 h-auto py-16 px-8 rounded-3xl bg-slate-200 shadow-lg">
                <h1 className="text-5xl font-bold text-center pb-4">
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
                        name="phone-number"
                        placeholder="Phone Number"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                    />
                    <textarea
                        placeholder="Message"
                        className="block mt-10 h-24 w-full border-b-2 border-orange-950 p-2 bg-transparent"
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="block w-2/5 bg-cyan-600 text-white px-4 py-3 mx-auto cursor-pointer hover:bg-amber-500 rounded-xl"
                    />
                </form>
            </div>
            {submitted ? (
                <p className="text-center font-bold text-xl text-black my-12">
                    {" "}
                    Thank you for contacting us!{" "}
                </p>
            ) : (
                <p className="text-center font-bold text-xl text-black my-12">
                    {" "}
                    There was an error sending your message.{" "}
                </p>
            )}

            <Footer />
        </>
    );
}

export default Contact;
