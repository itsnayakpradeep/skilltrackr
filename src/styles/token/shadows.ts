export const shadows = {
  // Custom navbar shadow - UPDATED for better visibility
  navbar: '0 4px 12px -1px rgba(0, 0, 0, 0.15), 0 2px 8px -1px rgba(0, 0, 0, 0.1)',
  
  // Enhanced navbar shadow - UPDATED for stronger effect
  navbarStrong: '0 8px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 8px -2px rgba(0, 0, 0, 0.15)',
  
  // Subtle shadow
  subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  
  // Medium shadow
  medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  
  // Large shadow
  large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  
  // Extra large shadow
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  
  // 2xl shadow
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Inner shadow
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // No shadow
  none: 'none',
};

// Tailwind CSS custom shadow utilities
export const customShadows = {
  'shadow-navbar': shadows.navbar,
  'shadow-navbar-strong': shadows.navbarStrong,
  'shadow-subtle': shadows.subtle,
  'shadow-medium': shadows.medium,
  'shadow-large': shadows.large,
  'shadow-xl': shadows.xl,
  'shadow-2xl': shadows['2xl'],
  'shadow-inner': shadows.inner,
  'shadow-none': shadows.none,
};
