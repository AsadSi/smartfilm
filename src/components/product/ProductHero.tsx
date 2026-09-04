'use client';

import Reveal from '@/components/Reveal';
import { useT } from '@/components/LanguageProvider';
import { ButtonLink } from '@/components/ui';
import type { Product } from '@/content/products';
import { UI } from '@/content/site';

/** The product opens on its own footage, full bleed, type centred over it. */
export default function ProductHero({ product }: { product: Product }) {
  const t = useT();

  return (
    <section className="relative isolate flex min-h-[84svh] items-end overflow-hidden bg-noir">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={product.media.poster}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src={product.media.videoHevc} type='video/mp4; codecs=hvc1' />
        <source src={product.media.video} type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/45 [background-image:linear-gradient(to_top,rgba(10,10,13,0.92),rgba(10,10,13,0.35)_55%,rgba(10,10,13,0.55))]"
      />

      <div className="shell pt-[calc(var(--header-h)+4rem)] pb-[clamp(3.5rem,7vw,6rem)]">
        <div className="mx-auto flex max-w-[48rem] flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow eyebrow-light block">{product.index}</p>
            <h1 className="display-xl mt-5 text-white">{product.name}</h1>
            <p className="mt-5 text-[11px] font-medium tracking-[0.3em] text-white/60 uppercase">
              {t(product.tagline)}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-7 max-w-[52ch] text-[clamp(1.02rem,1.35vw,1.2rem)] font-light leading-relaxed text-white/80">
              {t(product.lead)}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/kontakt">{t(UI.requestPrice)}</ButtonLink>
              <ButtonLink href="#specifikationer" variant="ghost-light">
                {t(UI.specifications)}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
