import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  output: 'standalone',
  images: {
    unoptimized: true // для статического экспорта
  }
}
