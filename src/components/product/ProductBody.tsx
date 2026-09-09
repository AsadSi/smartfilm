'use client';

import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { useT } from '@/components/LanguageProvider';
import { ChevronRight } from '@/components/ui';
import { otherProducts, type Product } from '@/content/products';
import { UI } from '@/content/site';

/** The three headline figures, straight under the hero. */
export function FigureRow({ product }: { product: Product }) {
  const t = useT();

  return (
    <section id="overblik" className="band-tight anchor-below-subnav">
      <div className="shell">
        <div className="grid grid-cols-3 gap-8">
          {product.figures.map((figure) => (
            <div
              key={figure.value}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="figure text-ink">{figure.value}</span>
              <span className="micro">{t(figure.label)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** One claim per band, set large. Nothing competes with it. */
export function ClaimBands({ product }: { product: Product }) {
  const t = useT();

  return (
    <section className="pb-[clamp(3rem,6vw,5.5rem)]">
      <div className="shell">
        {product.claims.map((claim, i) => (
          <Reveal key={t(claim)}>
            <article className="grid grid-cols-[auto_1fr] items-start gap-[clamp(1.25rem,4vw,3.5rem)] border-t border-line py-[clamp(2.25rem,5vw,4rem)] last:border-b">
              <span className="pt-3 text-[11px] font-medium tracking-[0.3em] text-gold-deep">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="display-md max-w-[22ch] font-normal text-ink">{t(claim)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** A full-bleed photograph, so the page is not carried by the hero video alone. */
export function ProductPhoto({ product }: { product: Product }) {
  const t = useT();

  return (
    <section className="relative isolate overflow-hidden bg-noir">
      <div className="relative aspect-[16/9] max-h-[70vh] w-full sm:aspect-[21/9]">
        <Image
          src={product.photo.src}
          alt={t(product.photo.alt)}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-noir/85 via-transparent to-transparent"
        />
        <div className="shell absolute inset-x-0 bottom-0 pb-[clamp(1.75rem,4vw,3rem)]">
          <p className="micro text-white/80">{t(product.photo.caption)}</p>
        </div>
      </div>
    </section>
  );
}

/** The other two products, so the collection stays one click away. */
export function NextProducts({ slug }: { slug: string }) {
  const t = useT();
  const others = otherProducts(slug);

  return (
    <section className="band">
      <div className="shell">
        <p className="eyebrow mb-[clamp(1.5rem,3vw,2.5rem)] block">{t(UI.collection)}</p>
        <div className="grid gap-5 sm:grid-cols-2">
          {others.map((product) => (
            <Link
              key={product.slug}
              href={`/${product.slug}`}
              className="group flex items-center gap-6"
            >
              <span className="media-frame relative h-28 w-36 shrink-0 overflow-hidden bg-noir-2 sm:h-32 sm:w-44">
                <Image
                  src={product.media.poster}
                  alt=""
                  fill
                  sizes="176px"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="micro block text-gold-deep">{product.index}</span>
                <span className="display-sm mt-1 block text-ink">{product.name}</span>
                <span className="mt-1 block truncate text-[13px] text-mut">
                  {t(product.tagline)}
                </span>
              </span>
              <span className="chev transition-transform duration-300 group-hover:translate-x-1">
                <ChevronRight />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
