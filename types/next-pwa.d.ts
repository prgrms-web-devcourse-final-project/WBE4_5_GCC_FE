declare module 'next-pwa' {
  import { NextConfig } from 'next';

  type PWAConfig = {
    dest?: string;
    disable?: boolean;
  };

  const withPWA =
    (config: PWAConfig): ((nextConfig: NextConfig) => NextConfig) =>
    (nextConfig: NextConfig) =>
      NextConfig;

  export default withPWA;
}
