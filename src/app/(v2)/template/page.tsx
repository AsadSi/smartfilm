import Link from 'next/link';
import { BRAND, TEMPLATES } from '@/content/v2';
import { Arrow, Reveal } from '@/components/v2/primitives';

export const metadata = {
  title: 'Fem designretninger — SmartFilm',
  description: 'Vælg mellem Stage, Vitrine, Salon, Promenade og Lumen.',
};

/**
 * The chooser.
 *
 * Deliberately plain — near-monochrome, no photography of its own beyond the
 * three thumbnails, no personality at all. It sits in front of three designs
 * that are each trying hard to have one, and anything decorative here would
 * compete with the thing it is asking you to judge.
 *
 * All three templates render the same words from the same content file. That is
 * the point of showing them together: when the copy is identical, the only
 * variable left is the design.
 */
export default function TemplateChooser() {
  return (
    <main id="main" className="min-h-svh bg-paper">
      <div className="v2-shell py-[clamp(3rem,7vw,7rem)]">
        <Reveal>
          <p className="v2-label v2-tick">{BRAND.full} · designretninger</p>
          <h1 className="v2-h2 mt-1">Fem retninger. Samme ord.</h1>
          <p className="v2-lead mt-6 max-w-[58ch]">
            De fem skabeloner nedenfor viser præcis den samme tekst, de samme tal og de samme
            billeder. Alt hvad der adskiller dem, er designet — layout, typografi, farve og tempo.
            Vælg retningen, ikke indholdet.
          </p>
        </Reveal>

        <ul className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {TEMPLATES.map((t, i) => (
            <Reveal as="li" key={t.slug} delay={i * 80}>
              <article className="group flex h-full flex-col">
                <Link href={`/template/${t.slug}`} className="v2-frame block aspect-[4/3] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={t.alt}
                    className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cold)] group-hover:scale-[1.03]"
                  />
                  <span className="v2-label v2-label-light absolute left-5 top-5">{t.index}</span>
                </Link>

                <h2 className="v2-h3 mt-6">{t.name}</h2>
                <p className="v2-label mt-2">{t.room} · {t.reference}</p>
                <p className="v2-body mt-4 text-[0.9375rem]">{t.blurb}</p>

                <Link href={`/template/${t.slug}`} className="v2-btn v2-btn-line mt-auto !mt-7 self-start">
                  Åbn {t.name}
                  <Arrow />
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <p className="v2-caption mt-[clamp(3rem,6vw,5rem)] max-w-[70ch] border-t border-hair pt-6">
            Fotografierne er midlertidige og hentet fra Pexels — matteret glas, LED-flader og
            lysinstallationer, altså det produkterne rent faktisk laver. Licens og kilde ligger i
            assets/pexels/CREDITS.md. Videoerne er SmartFilms egne: intet stockbibliotek har et klip
            af PDLC-glas, der skifter, og det er præcis dét, produktet gør.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
