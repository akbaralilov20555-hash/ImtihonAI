import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Downloads papkasida boshqa package-lock.json fayllari bo'lishi mumkinligi
  // sababli Next.js noto'g'ri workspace root aniqlamasligi uchun.
  outputFileTracingRoot: path.resolve(process.cwd()),
};

export default nextConfig;
