import type { NextConfig } from "next";

const basePath = "";

const nextConfig: NextConfig = {
  basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
