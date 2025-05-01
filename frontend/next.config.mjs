// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    allowedDevOrigins: ["172.23.144.1"] // Add your network IP here
  }
};

export default nextConfig;