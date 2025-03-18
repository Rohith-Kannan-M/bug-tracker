import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  reactStrictMode: true,
  env: {
    USERS: process.env.USERS,
  },
};

export default nextConfig;
