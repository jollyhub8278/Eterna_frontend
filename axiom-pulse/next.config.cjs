/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable Next's automatic optimized font loading which can cause
  // `ERR_UNSUPPORTED_ESM_URL_SCHEME` on Windows for some setups.
  optimizeFonts: false,
  images: {
    domains: ['axiom.trade'],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
};

module.exports = nextConfig;