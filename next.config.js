const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined ? process.env.NEXT_PUBLIC_BASE_PATH : "/stagging";

const nextConfig = {
  basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
