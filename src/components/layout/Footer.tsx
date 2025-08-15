import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <Image
                        src="/SkillTrackr-footer.svg"
                        alt="SkillTrackr Logo"
                        width={150}
                        height={50}
                        className="object-contain text-white"
                    />
                </div>
                <div className="flex space-x-10">
                    <div>
                        <h3 className="font-bold">Product</h3>
                        <ul className="mt-4">
                            <li>
                                <Link href="/features" className="hover:underline">Features</Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:underline">Pricing</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold">Company</h3>
                        <ul className="mt-4">
                            <li>
                                <Link href="/about" className="hover:underline">About</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:underline">Blog</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold">Support</h3>
                        <ul className="mt-4">
                            <li>
                                <Link href="/help-center" className="hover:underline">Help Center</Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center mt-8">
                <p>© 2024 SkillTrack, All rights reserved.</p>
                <div className="flex space-x-4">
                    <Link href="https://facebook.com" target="_blank">
                        <Image src="/icons/facebook-svgrepo-com.svg" alt="Facebook" width={24} height={24} />
                    </Link>
                    <Link href="https://instagram.com" target="_blank">
                        <Image src="/icons/instagram-color-svgrepo-com.svg" alt="Instagram" width={24} height={24} />
                    </Link>
                    <Link href="https://twitter.com" target="_blank">
                        <Image src="/icons/linkedin-icon-svgrepo-com.svg" alt="Linkedin" width={24} height={24} />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
