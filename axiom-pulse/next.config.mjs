import next from 'next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['axiom.trade', 'api.dicebear.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Critical for Windows ESM issues
  experimental: {
    esmExternals: 'loose',
  },
  // Webpack config for Windows compatibility
  webpack: (config, { isServer }) => {
    // Fix for Windows absolute path issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
};

// module.exports = nextConfig;
export default nextConfig;