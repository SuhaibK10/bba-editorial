import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.11", "192.168.1.13" ,"192.168.101.183","192.168.1.6"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/deh394y0h/**",
      },
    ],
  },
};

export default nextConfig;