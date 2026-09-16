import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/compliances",
        destination: "/industries/pharmaceuticals",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
