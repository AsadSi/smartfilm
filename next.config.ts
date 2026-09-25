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
  /**
   * Standard hardening, nothing the page relies on: no framing by other sites,
   * no MIME sniffing, no full URL sent to other sites, and no access to the
   * camera, microphone or location, which the site never asks for.
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

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
