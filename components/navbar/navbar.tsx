"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import { useState } from "react";

const Navbar = () => {
    const pathname = usePathname(); // Get the current path
    const [isSignedIn, setIsSignedIn] = useState(false); // Mock state for sign-in
    const [profilePicture, setProfilePicture] = useState("/next.svg"); // Mock profile picture

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link
                            href="/"
                            className={`${
                                isActive("/")
                                    ? "text-blue-500 font-bold"
                                    : "text-white"
                            }`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={`${
                                isActive("/about")
                                    ? "text-blue-500 font-bold"
                                    : "text-white"
                            }`}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={`${
                                isActive("/contact")
                                    ? "text-blue-500 font-bold"
                                    : "text-white"
                            }`}>
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* Right: Sign In / Profile Picture */}
                <div>
                    {isSignedIn ? (
                        <div className="flex items-center space-x-2">
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsSignedIn(true)} // Mock sign-in toggle
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
