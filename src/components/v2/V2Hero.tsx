'use client';

import { useRef, useState } from 'react';
import { V2_HERO } from '@/content/v2';
import { Arrow, Loop } from './primitives';

/**
 * The hero.
 *
 * A full-viewport film with the headline set low and left, which is the single
 * most recognisable move in this whole reference set. Centring the headline
 * would put it over the middle of the shot — the part of a frame the director
 * of photography spent the most on — and the layout would then have to fight
 * whatever is there. Bottom-left always has the scrim under it.
 *
 * The pause control is not decoration. An autoplaying full-screen video with no
 * way to stop it is a WCAG 2.2.2 failure, and it is also just rude on a laptop
 * battery.
 */
export default function V2Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="top" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-void">
      <Loop
        ref={videoRef}
        video={V2_HERO.media.video}
        videoHevc={V2_HERO.media.videoHevc}
        poster={V2_HERO.media.poster}
        className="v2-drift absolute inset-0 h-full w-full object-cover"
      />

      {/* Two scrims, not one. A single top-to-bottom gradient dark enough to
          carry white text at the bottom also greys out the sky at the top; a
          strong bottom scrim plus a light top one keeps the middle of the frame
          untouched, which is where the shot actually is.

          The bottom scrim is taller and darker on phones: the same copy that
          occupies a third of the height on a desktop hero occupies most of a
          375px one, so its top edge would otherwise land in the transparent
          part of the gradient. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[85%] bg-gradient-to-t from-black/85 via-black/45 to-transparent md:h-[70%]"
      />

      <div className="v2-shell absolute inset-x-0 bottom-0 pb-[clamp(3.5rem,9vh,7rem)]">
        <div>
          <p className="v2-label v2-label-light v2-tick v2-tick-light">{V2_HERO.label}</p>
          <h1 className="v2-display mt-1 text-white">{V2_HERO.headline}</h1>
        </div>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-16">
          <p className="v2-lead v2-lead-light max-w-[46ch]">{V2_HERO.lead}</p>

          <div className="flex flex-wrap gap-3">
            <a href="#serien" className="v2-btn v2-btn-solid-light">
              {V2_HERO.primary}
            </a>
            <a href="#kontakt" className="v2-btn v2-btn-line-light">
              {V2_HERO.secondary}
              <Arrow />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue, centred on the viewport rather than on the container — it
          belongs to the screen, not to the text column. */}
      <div
        aria-hidden="true"
        className="v2-cue absolute bottom-0 left-1/2 h-16 w-px -translate-x-1/2 overflow-hidden max-md:hidden"
      >
        <span />
      </div>

      <button
        type="button"
        onClick={toggle}
        className="v2-label v2-label-light absolute bottom-8 right-[var(--v2-gutter)] flex size-10 cursor-pointer items-center justify-center border border-white/35 text-white transition-colors duration-500 ease-[var(--ease-cold)] hover:bg-white/10 max-md:hidden"
      >
        <span className="sr-only">{playing ? 'Sæt filmen på pause' : 'Afspil filmen'}</span>
        {playing ? (
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
            <rect width="3" height="12" fill="currentColor" />
            <rect x="7" width="3" height="12" fill="currentColor" />
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
            <path d="M0 0l10 6-10 6z" fill="currentColor" />
          </svg>
        )}
      </button>
    </section>
  );
}
