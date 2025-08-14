import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for faster development startup
  serverExternalPackages: [],
  
  // Performance optimizations
  webpack: (config, { dev }) => {
    if (dev) {
      // Faster development builds
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }
    return config;
  },
  
  // Reduce bundle size
  compress: true,
  poweredByHeader: false,
  
  // Optimize images
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
