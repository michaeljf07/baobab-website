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
                className="min-h-screen bg-teal-600 flex items-stretch">
                {/* Left half */}
                <div className="w-1/2 p-12 flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-bold text-white mb-8 text-center lg:text-left">
                        About our Organization
                    </h2>
                    <p className="text-white text-lg text-center leading-relaxed">
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
                <div className="w-1/2 flex items-center justify-center">
                    <img
                        src="/home-background.jpg"
                        alt="About our organization"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            <section className="py-16 bg-white">
                <h2 className="text-5xl font-bold text-center text-black mb-12">
                    Ready to Make a Difference?
                </h2>
                <div className="flex justify-center">
                    <Link href="/wishlists">
                        <button className="bg-cyan-600 text-white px-10 py-4 rounded-xl hover:bg-amber-500 transition-colors text-xl">
                            Explore Wishlists
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
