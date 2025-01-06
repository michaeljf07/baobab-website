"use client";

import { useRef } from "react";

function About() {
    const targetRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        targetRef.current!.scrollIntoView({ behavior: "smooth" }); // Non-null assertion
    };
    return (
        <>
            <title>About Us - Baobab</title>
            <div>
                <img
                    src="about-us-background.png"
                    className="brightness-50 w-full"
                />
                <h1 className="text-6xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 text-white">
                    About Us
                </h1>
                <button
                    onClick={handleScroll}
                    className="text-white text-lg border-2 border-white px-4 py-2 rounded-xl hover:bg-amber-500 hover:border-amber-500 absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    Learn More
                </button>
            </div>
            <div
                ref={targetRef}
                className="my-24 mx-24 flex justify-center items-start space-x-36">
                <div className="text-center w-1/2">
                    <h1 className="font-bold text-4xl py-10">
                        Our Organization
                    </h1>
                    <p className="text-lg">
                        Baobab is a pioneering non-profit organization committed
                        to transforming the landscape of charitable giving. We
                        provide state-of-the-art online services designed to
                        streamline the donation process, making it easier and
                        more efficient for donors to contribute to causes they
                        care about. Our team is passionate about leveraging
                        technology to build a transparent and trustworthy
                        platform that connects generous individuals with
                        impactful charities, ensuring every donation is used
                        effectively to make a real difference.
                    </p>
                </div>
                <div className="text-center w-1/2">
                    <h1 className="font-bold text-4xl py-10">Our Mission</h1>
                    <p className="text-lg">
                        Our mission at Baobab is to enhance the impact of
                        charitable donations through innovation and
                        transparency. We strive to create a seamless and
                        efficient giving experience that empowers donors to
                        support causes with confidence. By simplifying the
                        donation process and fostering trust, we aim to inspire
                        more people to give generously, ultimately contributing
                        to a more compassionate and connected world.
                    </p>
                </div>
            </div>
        </>
    );
}

export default About;
