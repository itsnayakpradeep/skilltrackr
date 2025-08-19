import React from 'react';
import Button from '@components/ui/Button';

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-gray-100">
            <h1 className={`text-4xl font-semibold mb-4 font-heading`}>
                Track Your Learning Progress
            </h1>
            <p className={`text-lg mb-8 font-normal font-primary`}>
                Set goals, get personalized AI suggestions, and visualize your improvement.
            </p>
            <Button href="/signup" className="text-lg font-semibold" variant="primary">
                Get Started
            </Button>
        </div>
    );
};

export default Hero;
