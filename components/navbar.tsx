"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
    const { data: session } = useSession();

    const router = usePathname();

    const profilePicture = session?.user?.image || "/logo.png";

    const isActive = (path: string) => router === path;

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

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
                                : "text-black"
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
                    {!session ? (
                        <Link href="/account/signin">
                            <button className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-amber-500 h-12 flex items-center justify-center">
                                Sign In
                            </button>
                        </Link>
                    ) : (
                        <div className="relative">
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-10 h-10 rounded-full cursor-pointer"
                                onClick={toggleDropdown}
                            />
                            {dropdownVisible && (
                                <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-50">
                                    <Link
                                        href="/profile"
                                        className="block text-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="block text-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
