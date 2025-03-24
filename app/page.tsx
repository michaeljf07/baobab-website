"use client";

import Carousel from "@/components/carousel";
import { useRef } from "react";
import Link from "next/link";
import Script from "next/script";

<Script
    id="organization-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
        __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Baobab",
            url: "outreachbaobab.org",
            logo: "logo.png",
            description:
                "Baobab connects generous donors with charities, making donations seamless and impactful.",
            sameAs: ["https://www.linkedin.com/company/baobab-outreach/"],
        }),
    }}
/>;

export default function Home() {
    const aboutRef = useRef<HTMLElement>(null);

    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <Carousel onReadMoreClick={scrollToAbout} />
            <section
                ref={aboutRef}
                className="min-h-screen bg-teal-600 flex flex-col md:flex-row items-stretch">
                {/* Left half */}
                <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col items-center justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-center">
                        About our Organization
                    </h2>
                    <p className="text-white text-base md:text-lg text-center leading-relaxed">
                        Baobab is a dedicated non-profit organization
                        revolutionizing charitable giving through innovative
                        online services. Our mission is to enhance the
                        efficiency and effectiveness of donations, ensuring that
                        your contributions make the maximum impact. By
                        leveraging cutting-edge technology and fostering
                        transparency, Baobab connects generous donors with
                        worthy causes, simplifying the process of giving and
                        ensuring that every donation counts. Join us in our
                        commitment to creating a more charitable and connected
                        world.
                    </p>
                </div>

                {/* Right half */}
                <div className="w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center">
                    <img
                        src="/home-background.jpg"
                        alt="About our organization"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            <section className="py-8 md:py-16 bg-white px-4 md:px-0">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-black mb-8 md:mb-12">
                    Ready to Make a Difference?
                </h2>
                <div className="flex justify-center">
                    <Link href="/wishlists">
                        <button className="bg-cyan-600 text-white px-6 md:px-10 py-3 md:py-4 rounded-xl hover:bg-amber-500 transition-colors text-lg md:text-xl">
                            Explore Wishlists
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
