import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/supply/:path*", destination: "/erp/:path*", permanent: true },
      { source: "/make/:path*", destination: "/mes/:path*", permanent: true },
      { source: "/release/:path*", destination: "/qms/:path*", permanent: true },
      { source: "/continuum/:path*", destination: "/one/:path*", permanent: true },
      { source: "/contact-us", destination: "/demo", permanent: true },
      { source: "/compliance-engine", destination: "/how-it-works#compliance-engine", permanent: true },
      { source: "/orchestrator", destination: "/how-it-works#orchestrator", permanent: true },
      { source: "/neural-engine", destination: "/how-it-works#neural-engine", permanent: true },
      { source: "/infrastructure-security", destination: "/security-trust#security", permanent: true },
      { source: "/solutions/platform/trust-center", destination: "/security-trust", permanent: true },
      { source: "/solutions/platform", destination: "/how-it-works", permanent: true },
      { source: "/solutions/:product(erp|mes|qms)", destination: "/:product", permanent: true },
      { source: "/solutions", destination: "/products", permanent: true },
      { source: "/platform", destination: "/how-it-works", permanent: true },
      { source: "/modules", destination: "/products", permanent: true },
      {
        source: "/compliances",
        destination: "/industries/pharmaceuticals",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
