import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

const pwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

export default pwaConfig(nextConfig);
