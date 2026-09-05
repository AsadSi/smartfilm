'use client';

import { useT } from './LanguageProvider';
import { ButtonLink } from './ui';
import { HOME } from '@/content/pages';
import { UI } from '@/content/site';

/**
 * Full-bleed video with a light black wash over it — enough to hold the type at
 * AA on any frame of the footage, not enough to kill the picture.
 */
export default function Hero() {
  const t = useT();
  const { hero } = HOME;

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-noir">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/hero-poster.jpg"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src="/assets/optimized/hero.h265.mp4" type='video/mp4; codecs=hvc1' />
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/35 [background-image:linear-gradient(to_top,rgba(10,10,13,0.85),rgba(10,10,13,0.12)_45%,rgba(10,10,13,0.35))]"
      />

      <div className="shell pt-[calc(var(--header-h)+4rem)] pb-[clamp(4rem,9vw,7rem)]">
        <div className="flex max-w-[60rem] flex-col items-start text-left">
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-gold-light">
            {t(hero.eyebrow)}
          </p>

          <h1 className="display-xl mt-7 text-white">
            {t(hero.title)}{' '}
            <em className="display-em-light block">{t(hero.titleEm)}</em>
          </h1>

          <p className="mt-7 max-w-[46ch] text-[clamp(1.02rem,1.35vw,1.2rem)] font-light leading-relaxed text-white/80">
            {t(hero.sub)}
          </p>

          {/* Both outlined. The reference gives its hero two equal-weight
              outline controls and saves any filled button for the header. */}
          <div className="mt-10 flex flex-wrap items-center justify-start gap-4">
            <ButtonLink href="/kontakt" variant="ghost-light">
              {t(UI.requestQuote)}
            </ButtonLink>
            <ButtonLink href="/produkter" variant="ghost-light">
              {t(UI.seeCollection)}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="scroll-cue absolute right-[var(--gutter)] bottom-8 hidden h-14 w-px overflow-hidden md:block"
      >
        <span />
      </div>
    </section>
  );
}
