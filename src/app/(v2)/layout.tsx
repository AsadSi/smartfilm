import type { Metadata } from 'next';
import { Archivo, Inter } from 'next/font/google';
import '../v2.css';

/**
 * The v2 root layout.
 *
 * `(v2)` is a second root layout, not a nested one: `src/app` has no top-level
 * `layout.tsx`, so `(site)` and `(v2)` each own their own `<html>`. That keeps
 * the new design language completely off the live site — different fonts,
 * different stylesheet, no shared header — while both live in one project and
 * one dev server. The cost is that navigating between the two groups is a full
 * page load, which is the correct trade while the two designs coexist.
 */

// Archivo carries the display sizes; Inter carries anything below 20px. See the
// note in v2.css for why the split is by size rather than by taste.
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-archivo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SmartFilm — designskabelon',
  description:
    'Designskabelon for SmartFilm Danmark: skarp, kold og kompromisløs, i traditionen fra Porsche, Audi og Mercedes.',
  // A template is not a page anyone should find in search.
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: '#0a0b0d',
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" data-scroll-behavior="smooth" className={`${archivo.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
