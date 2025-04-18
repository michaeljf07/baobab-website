"use client";

import { useState, useEffect } from "react";

interface CarouselProps {
    onReadMoreClick: () => void;
}

const Carousel = ({ onReadMoreClick }: CarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Welcome to Baobab",
            image: "/Carousel1.jpg",
        },
        {
            title: "Make a Difference",
            image: "/Carousel2.jpg",
        },
        {
            title: "Join Our Community",
            image: "/Carousel3.jpg",
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                prevSlide();
            } else if (e.key === "ArrowRight") {
                nextSlide();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        const timer = setInterval(() => {
            nextSlide();
        }, 5000);

        // Cleanup
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="relative h-[calc(100vh-5rem)] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
                        currentSlide === index
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0"
                    }`}>
                    <div
                        className="absolute inset-0 bg-black/50"
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h2 className="text-white text-3xl md:text-6xl font-bold mb-4 md:mb-8 text-center px-4">
                            {slide.title}
                        </h2>
                        <button
                            onClick={onReadMoreClick}
                            className="border-2 border-white text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                            Read More
                        </button>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 md:h-12 md:w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 md:h-12 md:w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            currentSlide === index
                                ? "bg-white scale-125"
                                : "bg-white/50"
                        } transition-all duration-300`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
