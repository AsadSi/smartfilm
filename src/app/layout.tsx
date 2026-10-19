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
  // A large picture when the link is shared; the text comes from openGraph.
  twitter: { card: 'summary_large_image' },
};

/** The browser chrome on a phone takes the page's own ground. */
export const viewport: Viewport = {
  themeColor: '#F8F5F1',
};

/**
 * The remembered language, before the first paint — the key is the one
 * components/lang.ts writes. Not demo: the switch is part of the site.
 */
const REMEMBER_LANG = `try{var l=localStorage.getItem('sf-lang');if(l)document.documentElement.lang=l}catch(e){}`;

/** The remembered colour, the same way — the key is the one components/ThemeToggle.tsx writes. */
const REMEMBER_THEME = `try{if(localStorage.getItem('sf-theme')==='blue')document.documentElement.setAttribute('data-theme','blue')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The head scripts may change lang and data-theme before React arrives.
    <html lang="da" suppressHydrationWarning className={`${italiana.variable} ${manrope.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REMEMBER_LANG }} />
        <script dangerouslySetInnerHTML={{ __html: REMEMBER_THEME }} />
        {/* The section reveals start at opacity 0 and a script turns them on.
            With scripting off nothing would, so this shows them all at once. */}
        <noscript>
          <style>{`.rise{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
