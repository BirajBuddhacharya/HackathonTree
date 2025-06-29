import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import React, { useState } from "react";

interface NavBarProps {
    variant?: "ghost";
}

export default function NavBar(props: NavBarProps) {
    // If props.variant === 'ghost', set position to absolute, else relative
    const navPosition = props.variant === "ghost" ? "absolute text-white" : "relative bg-white";
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={`p-4 ${navPosition} z-30 w-full`}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Search */}
                <div className="text-lg font-bold flex gap-3 sm:gap-5 sm:justify-start justify-between items-center flex-1">
                    <Link href="/" className="shrink-0">
                        {props.variant === "ghost" ? (
                            <div className="relative flex sm:items-center items-between">
                                <span className="absolute inset-0 rounded-full bg-white/80 blur-2xl z-0" />
                                <Image
                                    src="/image/Logo.png"
                                    alt="Logo"
                                    width={50}
                                    height={50}
                                    className="relative z-10 opacity-90 hover:opacity-100 transition-opacity duration-300"
                                    priority
                                />
                            </div>
                        ) : (
                            <Image src="/image/Logo.png" alt="Logo" width={50} height={50} />
                        )}
                    </Link>
                    {/* Search bar: visible on sm+ screens, collapses on mobile */}
                    <div className="relative hidden sm:block flex-1 max-w-xs">
                        <Search size='16' className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black" />
                        <Input placeholder="Search..." className="text-sm font-normal w-64 px-4 pl-8 bg-white" />
                    </div>
                </div>
                {/* Hamburger menu for mobile */}
                <div className="sm:hidden flex items-center ml-2">
                    <button
                        aria-label="Open menu"
                        className="focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                            )}
                        </svg>
                    </button>
                </div>
                {/* Desktop nav */}
                <div className="hidden sm:flex gap-8 items-center">
                    <ul className="flex space-x-8">
                        <li><Link href="/" className="">Home</Link></li>
                        <li><Link href="/product" className="">Browse Products</Link></li>
                        {/* <li><Link href="/addProperty" className="">Register Startup</Link></li> */}
                    </ul>
                    <Link href="/auth/login" className="">
                        <Button className="px-6 rounded-3xl" size='lg'>
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
            {/* Mobile menu dropdown */}
            {menuOpen && (
                <div className={`sm:hidden mt-3 px-2 pb-3 transition-all duration-200 ${props.variant === "ghost" ? "bg-black/80 text-white" : "bg-white text-black"} rounded-lg shadow-lg`}>
                    <ul className="flex flex-col space-y-2">
                        <li>
                            <Link href="/" className="block py-2 px-2 w-full" onClick={() => setMenuOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/product" className="block py-2 px-2 w-full" onClick={() => setMenuOpen(false)}>
                                Browse Products
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/addProperty" className="block py-2 px-2 w-full" onClick={() => setMenuOpen(false)}>
                                Register Startup
                            </Link>
                        </li> */}
                        <li>
                            <Link href="/auth/login" className="block py-2 px-2 w-full" onClick={() => setMenuOpen(false)}>
                                <Button className="w-full rounded-3xl" size='lg'>
                                    Login
                                </Button>
                            </Link>
                        </li>
                    </ul>
                    {/* Mobile search bar */}
                    <div className="relative mt-3">
                        <Search size='16' className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black" />
                        <Input placeholder="Search..." className="text-sm font-normal w-full px-4 pl-8 bg-white" />
                    </div>
                </div>
            )}
        </nav>
    );
}