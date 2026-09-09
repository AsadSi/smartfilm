import type { Metadata } from 'next';
import { Archivo, Barlow_Condensed, IBM_Plex_Mono, Inter } from 'next/font/google';
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
 * Four families, because three templates that share a typeface are three
 * versions of one design. Each carries the face its register actually needs:
 *
 *   Archivo          A · Stage    sentence-case display, Porsche's proportions
 *   Inter            all          anything set below 20px
 *   IBM Plex Mono    B · Index    the catalogue's index numbers and labels
 *   Barlow Condensed C · Vitrine  the condensed uppercase Lamborghini register
 *
 * All four load on every template page. That is wasteful and deliberate: these
 * pages exist to be compared side by side, and whichever one wins takes its own
 * face with it and the other three come out.
 */
const archivo = Archivo({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-archivo', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-inter', display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono', display: 'swap' });
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-barlow', display: 'swap' });

export const metadata: Metadata = {
  title: 'SmartFilm — designskabeloner',
  description: 'Tre designretninger for SmartFilm Danmark: Stage, Index og Vitrine.',
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
      className={`${archivo.variable} ${inter.variable} ${plexMono.variable} ${barlow.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
