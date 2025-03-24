"use client";

import { useRef } from "react";

export default function AboutSection() {
    const targetRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        targetRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <button
                onClick={handleScroll}
                className="text-white text-base md:text-lg border-2 border-white px-4 py-2 rounded-xl hover:bg-amber-500 hover:border-amber-500 transition-colors mt-6 md:mt-8">
                Learn More
            </button>

            <div ref={targetRef} />
        </>
    );
}
