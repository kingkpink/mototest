import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile exists in a parent dir).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
