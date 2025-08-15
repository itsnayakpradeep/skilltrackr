"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "@components/ui/Button";

export default function Navbar() {
    const [isOpenMobilemenu, setIsOpenMobilemenu] = useState(false);  
    const toggleMobileMenu = () => {
        setIsOpenMobilemenu(!isOpenMobilemenu);
    }
    return (
    <>
        <nav className="w-full bg-white shadow-md sticky top-0 z-50" id="navbar-main">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16 px-4">
                    {/* Logo */}
                    <div className="bg-white flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/SkillTrackrlogo.svg"
                                alt="SkillTrackr-Logo"
                                width={140}
                                height={40}
                                className="object-contain h-auto"
                                priority
                            />
                        </Link>
                    </div>
                    
                    {/* Navigation Links*/}
                    <div className="hidden md:flex items-center ml-auto">
                        <ul className="flex items-center list-none mx-6 px-4 space-x-8">
                            <li>
                                <Link  
                                    href="/features" 
                                    className="font-sans text-gray-700 hover:text-primary font-medium no-underline"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/testimonial" className="text-gray-700 hover:text-primary font-medium no-underline">
                                    Testimonial
                                </Link>
                            </li>
                            <li>
                                <Link href="/price" className="text-gray-700 hover:text-primary font-medium no-underline">
                                    Price
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Auth Buttons */}
                    <div className="hidden md:inline-flex rounded-md shadow-sm gap-4" role="group">
                        {/* <button 
                            id="login-button"
                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 SignupButton"
                        >
                            login
                        </button> */}
                        <Button 
                            href="/signup"
                            className=""
                        >
                            Sign us
                        </Button>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 hover:text-primary focus:outline-none focus:text-primary"
                            aria-label="Toggle menu"
                        >
                            {isOpenMobilemenu ? (
                                <FaTimes size={24} />
                            ) : (
                                <FaBars size={24} />
                            )}
                        </button>
                    </div>
                </div>
            </div>    
        </nav>
        
        {/* Mobile Menu */}
        {isOpenMobilemenu && (
            <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 z-40">
                <div className="px-4 py-4">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <Link
                                href="/features"
                                className="block py-2 text-gray-700 hover:text-primary font-medium"
                                onClick={toggleMobileMenu}
                            >
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/testimonial"
                                className="block py-2 text-gray-700 hover:text-primary font-medium"
                                onClick={toggleMobileMenu}
                            >
                                Testimonial
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/price"
                                className="block py-2 text-gray-700 hover:text-primary font-medium"
                                onClick={toggleMobileMenu}
                            >
                                Price
                            </Link>
                        </li>
                        <li>
                            <Button
                                href="/signup"
                                className="w-full SignupButton"
                                onClick={toggleMobileMenu}
                            >
                                Sign up
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        )}
    </>
    );
}
