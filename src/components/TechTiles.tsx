'use client';

import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { ChevLink, ChevronRight, SectionHead } from './ui';
import { PRODUCTS } from '@/content/products';
import { HOME } from '@/content/pages';
import { UI } from '@/content/site';

/**
 * The collection router. Each of the three technologies gets a photograph, so
 * people can see what they are clicking before they click it.
 */
export default function TechTiles() {
  const t = useT();

  return (
    <section id="kollektion" className="band">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow={t(HOME.collection.eyebrow)}
            title={t(HOME.collection.title)}
            em={t(HOME.collection.titleEm)}
            action={<ChevLink href="/produkter">{t(UI.compareAll)}</ChevLink>}
          />
        </Reveal>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 md:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <Link
                href={`/${product.slug}`}
                className="group flex h-full flex-col"
              >
                <span className="media-frame relative block aspect-[4/3] overflow-hidden bg-noir-2">
                  <Image
                    src={product.media.poster}
                    alt={t(product.photo.alt)}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-noir/55 px-3 py-1.5 text-[10px] font-medium tracking-[0.24em] text-gold-light uppercase backdrop-blur-md">
                    {product.index}
                  </span>
                </span>

                <span className="flex flex-1 flex-col pt-6">
                  <span className="display-sm text-ink">{product.name}</span>
                  <span className="mt-2 text-[13.5px] text-mut">{t(product.tagline)}</span>

                  <span className="mt-auto flex items-end justify-between gap-4 pt-[clamp(1.5rem,3vw,2.25rem)]">
                    <span className="block">
                      <span className="figure block text-[clamp(1.8rem,3vw,2.4rem)] text-ink">
                        {product.figure.value}
                      </span>
                      <span className="micro mt-2 block">{t(product.figure.label)}</span>
                    </span>
                    <span className="chev pb-1 transition-transform duration-300 group-hover:translate-x-1">
                      <ChevronRight />
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
