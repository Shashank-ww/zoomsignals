/** @type {import('next').NextConfig} */ 
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow any host for RSS feeds
        pathname: "/**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
