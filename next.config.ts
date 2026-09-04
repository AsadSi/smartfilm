import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Without this, Next walks up past the repo and picks up an unrelated lockfile.
  turbopack: { root: __dirname },
};

export default nextConfig;
