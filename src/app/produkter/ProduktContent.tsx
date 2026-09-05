'use client';

import Image from 'next/image';
import Link from 'next/link';
import EndCta from '@/components/EndCta';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { useT } from '@/components/LanguageProvider';
import { ChevLink, SectionHead } from '@/components/ui';
import { PRODUKTER } from '@/content/pages';
import { keySpecs, PRODUCTS } from '@/content/products';
import { L } from '@/content/types';

export default function ProduktContent() {
  const t = useT();
  const { comparison } = PRODUKTER;

  return (
    <>
      <PageHero
        eyebrow={t(PRODUKTER.eyebrow)}
        title={t(PRODUKTER.title)}
        em={t(PRODUKTER.titleEm)}
        lead={t(PRODUKTER.lead)}
        image={{
          src: '/assets/p2-poster.jpg',
          alt: t(L('Transparent LED-film på en glasfacade', 'Transparent LED film on a glass facade')),
        }}
      />

      {/* Three cards, each opening with the product it describes */}
      <section className="band">
        <div className="shell grid gap-x-8 gap-y-[clamp(3rem,6vw,4.5rem)] lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <article className="flex h-full flex-col">
                <Link href={`/${product.slug}`} className="media-frame group relative block aspect-[4/3] bg-noir-2">
                  <Image
                    src={product.media.poster}
                    alt={t(product.photo.alt)}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-4 left-4 bg-noir/55 px-3 py-1.5 text-[10px] font-medium tracking-[0.24em] text-gold-light uppercase backdrop-blur-md">
                    {product.index}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col pt-6">
                  <h2 className="display-sm text-ink">
                    <Link href={`/${product.slug}`} className="transition-colors hover:text-gold-deep">
                      {product.name}
                    </Link>
                  </h2>
                  <p className="mt-2 text-[13.5px] text-mut">{t(product.tagline)}</p>
                  <p className="mt-5 text-[15px] leading-relaxed text-mut-2">{t(product.summary)}</p>

                  <dl className="mt-6 mb-6">
                    {keySpecs(product.slug, 3).map((spec) => (
                      <div
                        key={t(spec.label)}
                        className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                      >
                        <dt className="micro min-w-0">{t(spec.label)}</dt>
                        <dd className="figure-sm shrink-0 text-[14px] whitespace-nowrap text-ink">
                          {t(spec.value)}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-auto">
                    <ChevLink href={`/${product.slug}`}>
                      {t(L(`Se ${product.name}`, `See ${product.name}`))}
                    </ChevLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The comparison matrix */}
      <section id="sammenlign" className="band bg-sand">
        <div className="shell">
          <Reveal>
            <SectionHead eyebrow={t(comparison.eyebrow)} title={t(comparison.title)} />
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-[clamp(2rem,4vw,3rem)] overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <caption className="sr-only">
                  {t(L(
                    'Sammenligning af Smart Film, LED Film og 3D Media Glass',
                    'Comparison of Smart Film, LED Film and 3D Media Glass',
                  ))}
                </caption>
                <thead>
                  <tr>
                    <td className="w-[22%]" />
                    {PRODUCTS.map((product) => (
                      <th
                        key={product.slug}
                        scope="col"
                        className="border-b-2 border-gold-deep/50 p-4 text-[1.05rem] font-semibold text-ink"
                      >
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row) => (
                    <tr key={t(row.label)} className="transition-colors duration-300 hover:bg-cream/70">
                      <th scope="row" className="micro border-b border-line p-4 align-baseline">
                        {t(row.label)}
                      </th>
                      {row.values.map((value, i) => (
                        <td
                          key={`${t(row.label)}-${i}`}
                          className="figure-sm border-b border-line p-4 align-baseline text-[15px] text-ink"
                        >
                          {t(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-[13px] text-mut">{t(comparison.note)}</p>
          </Reveal>
        </div>
      </section>

      <EndCta />
    </>
  );
}
