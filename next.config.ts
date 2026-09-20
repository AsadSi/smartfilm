import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Without this, Next walks up past the repo and picks up an unrelated lockfile.
  turbopack: { root: __dirname },

  /**
   * Every route the site used to have is now a section of the one page, or is
   * gone entirely. These are the paths that existed long enough to be linked
   * to from outside, so they land on the nearest thing rather than 404ing.
   *
   * The two that used to point at #referencer and #hvorfor were left aiming at
   * anchors this page does not have, which is a redirect to nowhere in
   * particular — #anvendelse is where that content actually went.
   */
  async redirects() {
    return [
      { source: '/referencer', destination: '/#anvendelse', permanent: true },
      { source: '/om-os', destination: '/', permanent: true },
      { source: '/produkter', destination: '/', permanent: true },
      { source: '/smart-film', destination: '/#klar', permanent: true },
      { source: '/led-film', destination: '/#demo', permanent: true },
      { source: '/3d-media-glass', destination: '/', permanent: true },
      { source: '/kontakt', destination: '/#tilbud', permanent: true },
    ];
  },
};

export default nextConfig;
