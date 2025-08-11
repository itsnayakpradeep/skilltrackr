// import { Inter } from "next/font/google";

// export const inter = Inter({
//     subsets: ['latin'],
//     weight: ['400', '500', '700'], // adjust weights you need
//     variable: '--font-inter',      // CSS variable name
// });

export const typography = {
    fontFamily: {
        primary: 'sans-serif', // Fallback for sans-serif
        secondary: 'var(--font-mono),monospace', // Fallback for monospace
    },
    fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem',   // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem',  // 20px
        '2xl': '1.5rem',// 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
    },
    lineHeight: {
        normal: 'normal',
        snug: '1.375',
        relaxed: '1.625',
    },
    fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    }
}