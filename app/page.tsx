import Carousel from "@/components/carousel";
import Navbar from "../components/navbar";

export default function Home() {
    return (
        <div>
            <Navbar />
            <Carousel />
            <section className="min-h-screen bg-blue-600 flex items-center">
                <div className="container mx-auto flex">
                    {/* Left half */}
                    <div className="w-1/2 p-12 flex flex-col items-center justify-center">
                        <h2 className="text-4xl font-bold text-white mb-8 text-center">
                            About our Organization
                        </h2>
                        <p className="text-white text-lg text-center leading-relaxed">
                            Baobab is a pioneering non-profit organization committed to transforming 
                            the landscape of charitable giving. We provide state-of-the-art online 
                            services designed to streamline the donation process, making it easier 
                            and more efficient for donors to contribute to causes they care about. 
                            Our team is passionate about leveraging technology to build a transparent 
                            and trustworthy platform that connects generous individuals with impactful 
                            charities.
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
                <h2 className="text-4xl font-bold text-center text-black mb-8">
                    Ready to Make a Difference?
                </h2>
                <div className="flex justify-center">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                        View Wishlist
                    </button>
                </div>
            </section>
            <section className="py-12 bg-blue-600">
                <h2 className="text-4xl font-bold text-white text-center mb-4">
                    Baobab
                </h2>
                <p className="text-2xl text-white text-center">
                    outreach.baobab@gmail.com
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
