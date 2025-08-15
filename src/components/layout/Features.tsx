import React from 'react';
import Image from 'next/image';
import { typography } from '@styles/token/typography';

const Features = () => {
    return (
        <div className="bg-gray-50 py-12">
            <h2 className={`text-2xl font-bold ${typography.fontFamily.secondary} text-center`}>Features</h2> {/* Add heading for Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
                <div className="bg-white p-4 rounded shadow flex flex-col items-center">
                    <Image src="/icons/genetic-engineering-svgrepo-com.svg" alt="Ai Icon" width={64} height={64} />
                    <h2 className={`text-xl font-bold ${typography.fontFamily.secondary}`}>AI Suggestions</h2>
                    <p className={`text-md ${typography.fontFamily.primary}`}>
                        Track doc - Flash-teen
                    </p>
                </div>
                <div className="bg-white p-4 rounded shadow flex flex-col items-center">
                    <Image src="/icons/chart-svgrepo-com.svg" alt="Line Chart Icon" width={64} height={64} />
                    <h2 className={`text-xl font-bold ${typography.fontFamily.secondary}`}>Progress Charts</h2>
                    <p className={`text-md ${typography.fontFamily.primary}`}>
                        Progress trends over time.
                    </p>
                </div>
                <div className="bg-white p-4 rounded shadow flex flex-col items-center">
                    <Image src="/icons/cloud-acceleration-svgrepo-com.svg" alt="Cloud Icon" width={64} height={64} />
                    <h2 className={`text-xl font-bold ${typography.fontFamily.secondary}`}>Cloud Storage</h2>
                    <p className={`text-md ${typography.fontFamily.primary}`}>
                        Pay a curm Nanutily.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Features;
