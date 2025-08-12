import Image from "next/image";
import Link from "next/link";
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
            {/* Navigation Links */}
            
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