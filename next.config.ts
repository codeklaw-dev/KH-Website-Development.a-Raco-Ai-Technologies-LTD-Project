import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The deployed edge image transformer is not reliable for local assets.
  // These files are already compressed, so serve them directly instead.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
