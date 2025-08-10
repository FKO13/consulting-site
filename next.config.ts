import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// next.config.js
module.exports = {
  output: 'standalone', // Активируем статический экспорт
  distDir: 'out', // Указываем папку для экспорта
  images: {
    unoptimized: true // Для статического экспорта
  }
}