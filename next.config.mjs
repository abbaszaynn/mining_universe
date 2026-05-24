/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.output.chunkLoadTimeout = 120000;
    }
    return config;
  },
};

export default nextConfig;
