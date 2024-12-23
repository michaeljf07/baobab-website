"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import { useState } from "react";

const Navbar = () => {
    const pathname = usePathname();
    const [isSignedIn, setIsSignedIn] = useState(false); // Mock state for sign-in
    const profilePicture = "/logo.png";

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-gray-800 h-20 p-4 flex items-center w-full">
            <div className="flex items-center w-full justify-between">
                <div className="flex space-x-12 items-center ml-12">
                    <Link
                        href="/"
                        className={`${
                            isActive("/")
                                ? "text-blue-500 font-bold"
                                : "text-white"
                        }`}>
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={`${
                            isActive("/about")
                                ? "text-blue-500 font-bold"
                                : "text-white"
                        }`}>
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className={`${
                            isActive("/contact")
                                ? "text-blue-500 font-bold"
                                : "text-white"
                        }`}>
                        Contact
                    </Link>
                </div>
                <div className="flex items-center mr-12">
                    {isSignedIn ? (
                        <div className="flex items-center space-x-2">
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-12 h-12 rounded-full"
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsSignedIn(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 h-12 flex items-center justify-center">
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
