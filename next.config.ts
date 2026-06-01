import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
      {
        protocol: 'https',
        hostname: 'nxrvy6fgt5vlkvrm.public.blob.vercel-storage.com',
      }
    ],
  },
};

export default nextConfig;
