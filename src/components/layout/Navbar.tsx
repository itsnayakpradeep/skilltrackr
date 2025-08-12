import Image from "next/image";
import Link from "next/link";
import { colors } from "@styles/token/colors";
import { typography } from "@styles/token/typography";
import Button from "@components/ui/Button";

export default function Navbar() {
    return (
    <nav className="bg-white shadow-md sticky top-0 z-50" id="navbar-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 px-4">
                {/* Logo */}
                    <div className="bg-white flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/SkillTrackrlogo.svg"
                                alt="SkillTrackr-Logo"
                                width={170}
                                height={50}
                                className="h-10 w-10"
                            />
                        </Link>
                        
                    </div>
                {/* Navigation Links*/}
                <div className="flex items-center ml-auto">
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
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    {/* <Link
                        href="/login"
                        className="loginButton">
                        Login   
                    </Link> */}
                    <Button 
                        href="/signup"
                        className="SignupButton"
                    >
                        Sign up
                    </Button>
                </div>
            </div>
        </div>    
    </nav>
    );
}