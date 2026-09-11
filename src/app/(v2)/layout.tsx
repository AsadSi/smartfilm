import type { Metadata } from 'next';
import { Archivo, Barlow_Condensed, Bodoni_Moda, IBM_Plex_Mono, Inter } from 'next/font/google';
import AnchorScroll from '@/components/v2/AnchorScroll';
import '../v2.css';

/**
 * The v2 root layout.
 *
 * `(v2)` is a second root layout, not a nested one: `src/app` has no top-level
 * `layout.tsx`, so `(site)` and `(v2)` each own their own `<html>`. That keeps
 * the new work completely off the live site — different fonts, different
 * stylesheet, no shared header — while both live in one project and one dev
 * server. The cost is a full page load when navigating between the two, which
 * is the correct trade while the two coexist.
 *
 * Five families, because templates that share a typeface are versions of one
 * design rather than alternatives to it. Each carries the face its register actually needs:
 *
 *   Archivo          A · Stage       sentence-case display, Porsche's proportions
 *   Inter            all             anything set below 20px, and every label
 *   Barlow Condensed B · Vitrine     the condensed uppercase Lamborghini register
 *   Bodoni Moda      C/D · luxury    the didone that luxury retail actually uses
 *   IBM Plex Mono    E · Lumen       the mono eyebrow every high-end tech
 *                                    landing page has had since about 2021
 *
 * All four load on every template page. That is wasteful and deliberate: these
 * pages exist to be compared side by side, and whichever one wins takes its own
 * face with it and the other three come out.
 */
const archivo = Archivo({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-archivo', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-inter', display: 'swap' });
const bodoni = Bodoni_Moda({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-bodoni', display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono', display: 'swap' });
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-barlow', display: 'swap' });

export const metadata: Metadata = {
  title: 'SmartFilm — designskabeloner',
  description: 'Elleve designretninger for SmartFilm Danmark, fra Stage til Orbit.',
  // Templates are not pages anyone should find in search.
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: '#0a0b0d',
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="da"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${inter.variable} ${bodoni.variable} ${barlow.variable} ${plexMono.variable}`}
    >
      <body>
        {/* Switzer is not on Google Fonts, so it cannot go through next/font.
            Fontshare serves it free for commercial use, Typewolf has it on
            current work, and The Design Shelf names Fontshare as where to go
            when Inter will not do — F · Klar is the one template in the set not
            set in a Google face.

            These live inside <body>, not beside it: a <link> is not a legal
            child of <html>, and putting one there costs a hydration error. React
            hoists them into <head> from anywhere in the tree, and `precedence`
            is what tells it where in the cascade the sheet belongs — without it
            React refuses to hoist a stylesheet at all. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://api.fontshare.com/v2/css?f%5B%5D=switzer@400,500,600&display=swap"
        />
        <AnchorScroll />
        {children}
      </body>
    </html>
  );
}
