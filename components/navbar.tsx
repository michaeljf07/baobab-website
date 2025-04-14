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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const navLinks = [
        { href: "/", text: "Home" },
        { href: "/about", text: "About" },
        { href: "/contact", text: "Contact" },
        { href: "/wishlists", text: "Wishlists" },
    ];

    return (
        <nav className="bg-slate-100 h-20 p-4 flex items-center w-full relative">
            <div className="flex items-center w-full justify-between px-4 md:px-12">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <img src="/logo.png" className="w-14 rounded-md" alt="Baobab Logo" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8 items-center text-lg">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${
                                isActive(link.href)
                                    ? "text-amber-500 font-bold"
                                    : "text-black"
                            } hover:text-amber-500`}>
                            {link.text}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-200"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        {mobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Auth Section */}
                <div className="hidden md:flex items-center relative">
                    {!session ? (
                        <Link href="/account/signin">
                            <button className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-amber-500 h-12 flex items-center justify-center whitespace-nowrap">
                                Sign In
                            </button>
                        </Link>
                    ) : (
                        <div className="relative">
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover cursor-pointe"
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

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-20 left-0 right-0 bg-slate-100 shadow-lg md:hidden z-50">
                    <div className="flex flex-col p-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${
                                    isActive(link.href)
                                        ? "text-amber-500 font-bold"
                                        : "text-black"
                                } hover:text-amber-500 text-lg`}
                                onClick={() => setMobileMenuOpen(false)}>
                                {link.text}
                            </Link>
                        ))}
                        {!session ? (
                            <Link
                                href="/account/signin"
                                onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full bg-cyan-600 text-white px-4 py-2 rounded hover:bg-amber-500 h-12 flex items-center justify-center">
                                    Sign In
                                </button>
                            </Link>
                        ) : (
                            <Link
                                href="/profile"
                                className="flex items-center justify-center"
                                onClick={() => setMobileMenuOpen(false)}>
                                <img
                                    src={profilePicture}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
