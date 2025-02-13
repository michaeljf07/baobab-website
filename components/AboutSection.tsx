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
                className="text-white text-lg border-2 border-white px-4 py-2 rounded-xl hover:bg-amber-500 hover:border-amber-500 absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Learn More
            </button>

            <div ref={targetRef} />
        </>
    );
}
