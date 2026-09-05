import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Without this, Next walks up past the repo and picks up an unrelated lockfile.
  turbopack: { root: __dirname },

  /**
   * /referencer and /om-os were real routes and are linked to from outside the
   * site. Their content now lives in sections of the front page, so they
   * redirect there permanently rather than 404ing and losing the ranking.
   */
  async redirects() {
    return [
      { source: '/referencer', destination: '/#referencer', permanent: true },
      { source: '/om-os', destination: '/#hvorfor', permanent: true },
    ];
  },
};

export default nextConfig;
