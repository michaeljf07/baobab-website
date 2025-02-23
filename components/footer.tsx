"use client";

import { useState } from "react";

function Footer() {
    const [copied, setCopied] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText("outreach.baobab@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <div className="bg-slate-100">
            <section className="py-4">
                <h2
                    onClick={scrollToTop}
                    className="text-xl font-bold text-black text-center cursor-pointer hover:opacity-80 transition-opacity">
                    Baobab
                </h2>
                <p
                    onClick={copyEmail}
                    className="text-md text-black text-center cursor-pointer hover:opacity-80 transition-opacity relative">
                    outreach.baobab@gmail.com
                    {copied && (
                        <span className="absolute left-1/2 -translate-x-1/2 -top-8 text-sm bg-white text-black px-2 py-1 rounded">
                            Copied!
                        </span>
                    )}
                </p>
                <p className="text-center">
                    <a href="/legal/terms-of-service" className="text-blue-500">
                        Terms of Service
                    </a>{" "}
                    |
                    <a
                        href="/legal/privacy-policy"
                        className="text-blue-500 ml-2">
                        Privacy Policy
                    </a>
                </p>
            </section>
            <footer className="pb-6">
                <p className="text-gray-500 text-sm text-center">
                    © 2024 Baobab
                </p>
            </footer>
        </div>
    );
}

export default Footer;
