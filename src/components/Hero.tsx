'use client';

import { useEffect, useRef, useState } from 'react';
import { HERO } from '@/content/site';
import { BlurText } from './BlurText';

/**
 * The hero is one screen of the client's own footage.
 *
 * The page it replaced fetched this file as a blob so it could drive the
 * playhead from the scroll position; that was dropped there long before this
 * rebuild, and the loading chrome it needed — a progress bar and a countdown
 * ring — went with it. What is left is a poster that hands over to a looping
 * video, which is all the markup ever actually used.
 *
 * Phones, portrait tablets and anyone who asked for less motion get the
 * composed still instead. That is decided in CSS, so the layout is right on
 * the first paint; this only stops the file being fetched at all.
 */
const STILL_ONLY = [
  '(max-width:720px)',
  '(orientation:portrait) and (max-width:1024px)',
  '(orientation:portrait) and (pointer:coarse)',
  '(orientation:landscape) and (pointer:coarse) and (max-height:560px)',
  '(prefers-reduced-motion:reduce)',
];

export function Hero() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const queries = STILL_ONLY.map((q) => window.matchMedia(q));
    const apply = () => {
      const video = ref.current;
      if (!video) return;
      if (queries.some((q) => q.matches)) {
        video.removeAttribute('src');
        setReady(false);
        return;
      }
      if (!video.getAttribute('src')) {
        video.src = HERO.video;
        video.play().catch(() => {
          // Autoplay refused. The poster is already the right picture, so
          // there is nothing to recover from and nothing to tell the reader.
        });
      }
    };

    apply();
    queries.forEach((q) => q.addEventListener('change', apply));
    return () => queries.forEach((q) => q.removeEventListener('change', apply));
  }, []);

  return (
    <section className="hero" id="top">
      <div className={`stage${ready ? ' video-ready' : ''}`}>
        <div className="poster" aria-hidden="true" style={{ backgroundImage: `url(${HERO.poster})` }} />
        <video
          ref={ref}
          preload="none"
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setReady(true)}
        />
        <div className="scrim" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />

        {/* No overlay headline: this footage carries its own in every frame,
            so the page adds one action and gets out of the way. */}
        <div className="hero-cta">
          <p>{HERO.strap}</p>
          <a className="btn btn-primary" href="#tilbud">{HERO.cta}</a>
        </div>

        <div className="chip" aria-hidden="true">
          <i />
          <span>{HERO.chip}</span>
        </div>

        {/* Phones, portrait tablets, reduced motion */}
        <div className="static-hero wrap">
          <p className="kicker">{HERO.kicker}</p>
          <div className="col"><BlurText text={HERO.headline} /></div>
          <p className="sub">{HERO.sub}</p>
          <a className="btn btn-primary" href="#tilbud">{HERO.cta}</a>
        </div>

        {/* The hero is exactly one screen, so nothing below it shows — this is
            the only sign there is more. A link, so it also takes you there. */}
        <a className="scroll-cue" href={HERO.scroll.href} aria-label={HERO.scroll.label}>
          <span>{HERO.scroll.text}</span>
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
