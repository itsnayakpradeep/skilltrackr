export const typography = {
    fontFamily: {
        // Primary choice: Inter (best readability for dashboards)
        primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        
        // Alternative combo: Poppins for headings
        heading: 'Poppins, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        
        // Body text with Inter as primary
        body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        
        // Monospace fallback
        mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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
        '5xl': '3rem',    // 48px
        '6xl': '3.75rem', // 60px
    },
    lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
    },
    fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
    }
}

// Font family utilities for easy access
export const fontFamily = {
    inter: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    poppins: 'Poppins, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

// Typography presets for different use cases
export const typographyPresets = {
    dashboard: {
        fontFamily: fontFamily.inter,
        fontWeight: typography.fontWeight.normal,
    },
    heading: {
        fontFamily: fontFamily.poppins,
        fontWeight: typography.fontWeight.semibold,
    },
    body: {
        fontFamily: fontFamily.inter,
        fontWeight: typography.fontWeight.normal,
    },
    code: {
        fontFamily: fontFamily.mono,
        fontWeight: typography.fontWeight.normal,
    },
};
