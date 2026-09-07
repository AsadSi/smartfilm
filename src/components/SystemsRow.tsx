'use client';

import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { ChevLink } from './ui';
import { PRODUCTS } from '@/content/products';
import { HOME } from '@/content/pages';
import { UI } from '@/content/site';

/**
 * This homepage grid uses the same poster image the product page's video
 * falls back to — except where a real installation render exists. Overridden
 * only here, so each video and its own poster frame on the product page
 * stay untouched.
 *
 * The 3D Media Glass tile gave up media-glass-mall.jpg to the reference band's
 * "Mødelokale og klinik" case and took the new interior render in its place, so
 * neither photograph appears twice on the homepage.
 *
 * LED Film then had to move too: led-lounge.jpg and the new render both show
 * the same model creative, and side by side in this row they read as one
 * installation photographed twice. It swapped with the "why" cards below for
 * the night facade, which has no figure in it at all.
 */
const TILE_IMAGE: Record<string, string> = {
  'led-film': '/assets/led-facade-night.jpg',
  '3d-media-glass': '/assets/glass-lobby-cube.jpg',
};

/**
 * The "Systems" band: the heading sits on one line with a compare link pushed
 * to the right, and the three technologies sit underneath as a plain grid —
 * image, name, a paragraph of prose, one link. No figures and no numbered
 * badge; the description carries the card.
 */
export default function SystemsRow() {
  const t = useT();

  return (
    <section id="kollektion" className="band">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-b border-line pb-6">
            <h2 className="display-lg text-ink">{t(HOME.collection.title)}</h2>
            <ChevLink href="/produkter">{t(UI.compareAll)}</ChevLink>
          </div>
        </Reveal>

        <div className="mt-[clamp(2.5rem,5vw,3.5rem)] grid gap-x-6 gap-y-12 md:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <Link href={`/${product.slug}`} className="group flex h-full flex-col">
                <span className="media-frame relative block aspect-[4/3] overflow-hidden bg-noir-2">
                  <Image
                    src={TILE_IMAGE[product.slug] ?? product.media.poster}
                    alt={t(product.photo.alt)}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                </span>

                <span className="flex flex-1 flex-col pt-6">
                  <span className="display-sm text-ink">{product.name}</span>
                  <span className="mt-3 block text-[14.5px] leading-relaxed text-mut-2">
                    {t(product.summary)}
                  </span>
                  <span className="mt-auto pt-6">
                    <span className="chev transition-[gap] duration-300 group-hover:gap-[0.6rem]">
                      {t(UI.specifications)}
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
