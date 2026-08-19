import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  transpilePackages: ['lucide-react'],
  reactStrictMode: false,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  serverExternalPackages: [`require-in-the-middle`],
  experimental: {
    serverActions: {
      bodySizeLimit: '60mb',
    },
    proxyClientMaxBodySize: '60mb',
  },
  allowedDevOrigins: [],
  turbopack: {},
};

export default nextConfig;
