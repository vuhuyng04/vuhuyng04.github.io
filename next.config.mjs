/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable server-side features for static export
  experimental: {
  },
  basePath: '',  // Empty basePath for root domain
  assetPrefix: '', // Empty assetPrefix for root domain
  webpack: (config) => {
    return config;
  },
}

export default nextConfig 
