import AboutSection from "@/components/AboutSection";

export const metadata = {
    title: "About Us - Baobab",
};

export default function About() {
    return (
        <div>
            <div className="relative">
                <div className="h-[50vh] md:h-[60vh] relative overflow-hidden">
                    <img
                        src="about-us-background.png"
                        className="brightness-50 w-full h-full object-cover"
                        alt="About Us Background"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
                            About Us
                        </h1>
                        <AboutSection />
                    </div>
                </div>
            </div>

            <div className="py-12 md:py-24 px-6 md:px-24">
                <div className="flex flex-col md:flex-row justify-center items-start md:space-x-12 lg:space-x-36 space-y-12 md:space-y-0">
                    <div className="text-center w-full md:w-1/2">
                        <h1 className="font-bold text-3xl md:text-4xl py-6 md:py-10">
                            Our Organization
                        </h1>
                        <p className="text-base md:text-lg">
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

                    <div className="text-center w-full md:w-1/2">
                        <h1 className="font-bold text-3xl md:text-4xl py-6 md:py-10">
                            Our Mission
                        </h1>
                        <p className="text-base md:text-lg">
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
            </div>
        </div>
    );
}
