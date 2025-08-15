import React from 'react';
import Button from '@components/ui/Button';
import Features from './Features'; // Import the new Features component
import { typography } from '@styles/token/typography';

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-gray-100">
            <h1 className={`text-4xl font-bold mb-4 ${typography.fontFamily.secondary}`}>
                Track Your Learning Progress
            </h1>
            <p className={`text-lg mb-8 font-normal ${typography.fontFamily.primary}`}>
                Set goals, get personalized AI suggestions, and visualize your improvement.
            </p>
            <Button href="/signup" className="text-lg font-semibold" variant="primary">
                Get Started
            </Button>
            {/* Include the Features component */}
            {/* <Features />  */}
            
        </div>
    );
};

export default Hero;
