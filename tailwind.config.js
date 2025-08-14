// tailwind.config.js (ESM syntax)
import { colors } from './src/styles/token/colors.ts';
import { typography } from './src/styles/token/typography.ts';
import { spacing } from './src/styles/token/spacing.ts';
import { screens } from './src/styles/token/screens.ts';
import { shadows } from './src/styles/token/shadows.ts';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      lineHeight: typography.lineHeight,
      fontWeight: typography.fontWeight,
      spacing,
      screens,
      boxShadow: {
        navbar: shadows.navbar,
        'navbar-strong': shadows.navbarStrong,
        subtle: shadows.subtle,
        medium: shadows.medium,
        large: shadows.large,
        xl: shadows.xl,
        '2xl': shadows['2xl'],
        inner: shadows.inner,
        none: shadows.none,
      },
    },
  },
  plugins: [],
};

export default config;
