/** @type {import('tailwindcss').Config} */
import { colors } from './src/styles/token/colors';
import { typography } from './src/styles/token/typography';
import { spacing } from'./src/styles/token/spacing';

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors,
            typography,
            spacing,
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
            },
            fontSize: typography.fontSize,
            lineHeight: typography.lineHeight,
            fontWeight: typography.fontWeight,
        },
    },
    plugins: [],
}
