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
        <div className="mx-auto flex max-w-[54rem] flex-col items-center text-center">
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

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/kontakt">{t(UI.requestQuote)}</ButtonLink>
            <ButtonLink href="/produkter" variant="ghost-light">
              {t(UI.seeCollection)}
            </ButtonLink>
          </div>

          {/* The three headline figures, read as a strip rather than a column */}
          <dl className="mt-12 grid w-full max-w-[34rem] grid-cols-3 gap-6 border-t border-white/20 pt-7">
            {hero.meta.map((item) => (
              <div key={item.value} className="flex flex-col items-center gap-2">
                <dd className="figure text-[clamp(1.6rem,3vw,2.2rem)] text-gold-light">
                  {item.value}
                </dd>
                <dt className="micro text-white/55">{t(item.label)}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="scroll-cue absolute bottom-8 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden md:block"
      >
        <span />
      </div>
    </section>
  );
}
