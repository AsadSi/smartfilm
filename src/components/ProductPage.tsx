'use client';

import { useT } from './lang';
import { ProductShot } from './ProductShot';
import { QuoteForm } from './QuoteForm';
import { Faq, Specs } from './Sections';
import { Reveal } from './Reveal';
import { SubHeader } from './SubHeader';

/**
 * One product on a page of its own, so each can be found by what it is. Every
 * word is the front page's own: the product card, the figures, the notes
 * beside the demonstrations, the FAQ and the enquiry form. Index 0 is the LED
 * film, 1 is Smart Film.
 */
export function ProductPage({ index }: { index: number }) {
  const { PRODUCTS: P, UI, DEMO, SMART_FILM } = useT();
  const p = P.items[index];
  const led = index === 0;

  // The page scrolls to the form without writing a #fragment to the address bar.
  const toForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('tilbud')?.scrollIntoView();
  };

  return (
    <>
      <SubHeader title={`${p.name} · ${UI.title.split(' · ')[0]}`} />

      <main id="main" tabIndex={-1}>
        <section className="section pp-hero">
          <div className="wrap pp-grid">
            <div className="pp-copy">
              <p className="kicker">{P.kicker}</p>
              <h1>{p.name}</h1>
              <p className="pp-claim">{p.claim}</p>
              <p className="lede">{p.body}</p>

              <ul className="prod-points">
                {p.points.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <p className="prod-for"><span>{P.forLabel}</span>{p.for}</p>
              <a className="btn btn-primary" href="#tilbud" onClick={toForm}>{UI.cta}</a>
            </div>

            <ProductShot item={p} sizes="(min-width:980px) 52vw, 100vw" priority />
          </div>
        </section>

        {led ? (
          <Specs />
        ) : (
          <section className="section pp-figs-wrap">
            <div className="wrap">
              <Reveal className="head">
                <p className="kicker">{SMART_FILM.kicker}</p>
                <h2>{SMART_FILM.headline}</h2>
                <hr className="edge" />
                <p className="lede">{SMART_FILM.lede}</p>
              </Reveal>
              <Reveal>
                <ul className="pp-figs">
                  {SMART_FILM.figures.map((f) => (
                    <li key={f.label}><b>{f.value}</b><span>{f.label}</span></li>
                  ))}
                </ul>
                <p className="klar-note">{SMART_FILM.note}</p>
              </Reveal>
            </div>
          </section>
        )}

        {led ? (
          <section className="section pp-figs-wrap">
            <div className="wrap">
              <Reveal className="head">
                <p className="kicker">{DEMO.kicker}</p>
                <h2>{DEMO.headline}</h2>
                <hr className="edge" />
                <p className="lede">{DEMO.lede}</p>
              </Reveal>
              <Reveal>
                <ul className="prod-points pp-points">
                  {DEMO.points.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </Reveal>
            </div>
          </section>
        ) : null}

        <Faq />
        <QuoteForm />
      </main>
    </>
  );
}
