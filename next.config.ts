import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
} as unknown as NextConfig;

const pwaConfig = withPWA({
  dest: '.next', // 기본값으로 두는 게 좋습니다
  disable: process.env.NODE_ENV === 'development',
});

export default pwaConfig(nextConfig);
