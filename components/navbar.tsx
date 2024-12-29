"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Navbar() {
    const router = usePathname();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const profilePicture = "/logo.png";

    const isActive = (path: string) => router === path;

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-slate-100 h-20 p-4 flex items-center w-full">
            <div className="flex items-center w-full justify-between">
                <div className="flex space-x-12 items-center ml-12 text-lg">
                    <Link href="/">
                        <img src="/logo.png" className="w-14 rounded-md" />
                    </Link>
                    <Link
                        href="/"
                        className={`${
                            isActive("/")
                                ? "text-amber-500 font-bold"
                                : "text-text-black"
                        } hover:text-amber-500`}>
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={`${
                            isActive("/about")
                                ? "text-amber-400 font-bold"
                                : "text-black"
                        } hover:text-amber-500`}>
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className={`${
                            isActive("/contact")
                                ? "text-amber-400 font-bold"
                                : "text-black"
                        } hover:text-amber-500`}>
                        Contact
                    </Link>
                    <Link
                        href="/wishlists"
                        className={`${
                            isActive("/wishlists")
                                ? "text-amber-400 font-bold"
                                : "text-black"
                        } hover:text-amber-500`}>
                        Wishlists
                    </Link>
                </div>
                <div className="flex items-center mr-12 relative">
                    {!isSignedIn &&
                    !(
                        isActive("/account/signin") ||
                        isActive("/account/signup")
                    ) ? (
                        <Link href="/account/signin">
                            <button
                                onClick={() => setIsSignedIn(true)}
                                className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-amber-500 h-12 flex items-center justify-center">
                                Sign In
                            </button>
                        </Link>
                    ) : null}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
