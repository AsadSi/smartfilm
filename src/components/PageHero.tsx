'use client';

import Image from 'next/image';
import Reveal from './Reveal';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  em?: string;
  lead: string;
  image: { src: string; alt: string };
  /** Full-height treatment for pages that open on a picture. */
  tall?: boolean;
};

/**
 * The sub-page opening. A photograph, a light black wash, and the title
 * centred over it — the same move Apple makes at the top of a product page.
 */
export default function PageHero({ eyebrow, title, em, lead, image, tall = false }: PageHeroProps) {
  return (
    <section
      className={`relative isolate flex items-end overflow-hidden bg-noir ${
        tall ? 'min-h-[78svh]' : 'min-h-[62svh]'
      }`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/40 [background-image:linear-gradient(to_top,rgba(10,10,13,0.9),rgba(10,10,13,0.2)_55%,rgba(10,10,13,0.4))]"
      />

      <div className="shell pt-[calc(var(--header-h)+4rem)] pb-[clamp(3rem,6vw,5rem)]">
        <div className="max-w-[46rem]">
          <Reveal>
            <p className="eyebrow eyebrow-light mb-5 block">{eyebrow}</p>
            <h1 className="display-xl text-white">
              {title} {em ? <em className="display-em-light block">{em}</em> : null}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-7 max-w-[54ch] text-[clamp(1.02rem,1.35vw,1.2rem)] font-light leading-relaxed text-white/80">
              {lead}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
