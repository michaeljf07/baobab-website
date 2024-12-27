"use client";

import Carousel from "@/components/carousel";
import Navbar from "../components/navbar";
import { useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
    const aboutRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText("outreach.baobab@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div>
            <Navbar />
            <Carousel onReadMoreClick={scrollToAbout} />
            <section ref={aboutRef} className="min-h-screen bg-amber-500 flex items-center">
                <div className="container mx-auto flex">
                    {/* Left half */}
                    <div className="w-1/2 p-12 flex flex-col items-center justify-center">
                        <h2 className="text-4xl font-bold text-white mb-8 text-center">
                            About our Organization
                        </h2>
                        <p className="text-white text-lg text-center leading-relaxed">
                        Baobab is a dedicated non-profit organization revolutionizing charitable giving through innovative online services. Our mission is to enhance the efficiency and effectiveness of donations, ensuring that your contributions make the maximum impact. By leveraging cutting-edge technology and fostering transparency, Baobab connects generous donors with worthy causes, simplifying the process of giving and ensuring that every donation counts. Join us in our commitment to creating a more charitable and connected world.
                        </p>
                    </div>
                    
                    {/* Right half */}
                    <div className="w-1/2"> 
                        <img 
                            src="/home-background.jpg" 
                            alt="About our organization" 
                            className="w-full h-screen object-cover"
                        />
                    </div>
                </div>
            </section>
            <section className="py-16 bg-white">
                <h2 className="text-5xl font-bold text-center text-black mb-12">
                    Ready to Make a Difference?
                </h2>
                <div className="flex justify-center">
                    <Link href="/wishlists">
                        <button className="bg-amber-500 text-white px-12 py-4 rounded-xl hover:bg-amber-600 transition-colors text-xl">
                            View Wishlist
                        </button>
                    </Link>
                </div>
            </section>
            <section className="py-8 bg-amber-500">
                <h2 
                    onClick={scrollToTop}
                    className="text-3xl font-bold text-white text-center mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    Baobab
                </h2>
                <p 
                    onClick={copyEmail}
                    className="text-xl text-white text-center cursor-pointer hover:opacity-80 transition-opacity relative"
                >
                    outreach.baobab@gmail.com
                    {copied && (
                        <span className="absolute left-1/2 -translate-x-1/2 -top-8 text-sm bg-white text-black px-2 py-1 rounded">
                            Copied!
                        </span>
                    )}
                </p>
            </section>
            <footer className="py-6 bg-white">
                <p className="text-gray-500 text-sm text-center">
                    © 2024 Baobab
                </p>
            </footer>
        </div>
    );
}
