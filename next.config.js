/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export to enable API routes
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;