import dotenv from 'dotenv';
import type { NextConfig } from "next";
import { env } from "process";

dotenv.config({
  path: `environments/.env.${process.env.SERVICES_ENV || "development"}`,
});
console.log(env.ENV)
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output:'export',
  distDir: 'dist',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*', // 匹配所有以 /api/ 开头的请求
  //       destination: 'https://api.bitget.com/api/:path*', // 目标后端地址
  //     },
  //   ];
  // },
};

export default nextConfig;
