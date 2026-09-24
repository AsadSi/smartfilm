import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Italiana, Manrope } from 'next/font/google';
import { SITE } from '@/content/site';
import './globals.css';

const italiana = Italiana({ subsets: ['latin'], weight: '400', variable: '--font-italiana', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-manrope', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: 'SmartFilm Danmark · Transparent LED-film og smart film til glas',
  description:
    '2 mm LED-film gør ruden til en skærm, og smart film gør den mat eller klar på en kontakt — begge dele uden at lukke dagslyset ude. Levering og montering i hele Danmark.',
  openGraph: {
    type: 'website',
    locale: 'da_DK',
    siteName: SITE.full,
    title: 'Så tynd, at du ikke ser den. Indtil den tændes.',
    description: 'Transparent LED-film og smart film til glas. Levering og montering i hele Danmark.',
    url: '/',
    images: ['/assets/hero-ending.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#F8F5F1',
};

/**
 * DEMO ONLY. Applies the remembered colour scheme before the first paint —
 * in the picker's own component this would run after hydration, and a client
 * reloading would watch the page load light and then turn dark.
 */
const REMEMBER_THEME = `try{var t=localStorage.getItem('sf-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${italiana.variable} ${manrope.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REMEMBER_THEME }} />
        {/* Everything that animates in starts at opacity 0. With scripting off
            nothing would ever turn it on, so the whole page would be blank —
            one rule covers every element at once. */}
        <noscript>
          <style>{`.rise{opacity:1!important;transform:none!important}body{opacity:1!important}.blur-text span{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
