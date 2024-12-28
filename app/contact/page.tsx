"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            phoneNumber,
            message,
        };

        const response = await fetch("/api/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Message sent successfully!");
        } else {
            alert("Failed to send message.");
        }
    };

    return (
        <>
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        name="phone-number"
                        placeholder="Phone Number"
                        className="block w-full border-b-2 border-orange-950 p-2 bg-transparent"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <textarea
                        placeholder="Message"
                        className="block mt-10 h-24 w-full border-b-2 border-orange-950 p-2 bg-transparent"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
            ) : null}

            <Footer />
        </>
    );
}

export default Contact;
