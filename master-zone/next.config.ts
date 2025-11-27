import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: process.env.NEXT_PUBLIC_BLOG_URL || "http://localhost:4000",
        permanent: process.env.NODE_ENV === "production",
      }
    ];
  },
};

export default nextConfig;
