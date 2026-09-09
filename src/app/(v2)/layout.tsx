import type { Metadata } from 'next';
import { Archivo, Barlow_Condensed, Bodoni_Moda, Inter } from 'next/font/google';
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
 *   Archivo          A · Stage       sentence-case display, Porsche's proportions
 *   Inter            all             anything set below 20px, and every label
 *   Barlow Condensed B · Vitrine     the condensed uppercase Lamborghini register
 *   Bodoni Moda      C/D · luxury    the didone that luxury retail actually uses
 *
 * All four load on every template page. That is wasteful and deliberate: these
 * pages exist to be compared side by side, and whichever one wins takes its own
 * face with it and the other three come out.
 */
const archivo = Archivo({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-archivo', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-inter', display: 'swap' });
const bodoni = Bodoni_Moda({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-bodoni', display: 'swap' });
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-barlow', display: 'swap' });

export const metadata: Metadata = {
  title: 'SmartFilm — designskabeloner',
  description: 'Fire designretninger for SmartFilm Danmark: Stage, Vitrine, Salon og Promenade.',
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
      className={`${archivo.variable} ${inter.variable} ${bodoni.variable} ${barlow.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
