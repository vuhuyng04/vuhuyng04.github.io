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
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', // Change <YOUR_REPO_NAME> to your actual repository name (e.g., /my-portfolio) for GitHub Pages
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '', // This should also be your repository name for assets
  webpack: (config) => {
    return config;
  },
}

export default nextConfig 