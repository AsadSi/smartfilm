'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useT } from './lang';
import { Faq } from './Sections';
import { SubHeader } from './SubHeader';

/**
 * One product on a page of its own, so each can be found by what it is. It
 * says only what the front page's product cards already say, at the reading
 * measure the privacy policy uses, with the FAQ and the way to the form.
 */
export function ProductPage({ index }: { index: number }) {
  const { PRODUCTS: P, UI } = useT();
  const p = P.items[index];

  return (
    <>
      <SubHeader title={`${p.name} · ${UI.title.split(' · ')[0]}`} />

      <main id="main" tabIndex={-1} className="section legal">
        <div className="wrap">
          <p className="kicker">{P.kicker}</p>
          <h1>{p.name}</h1>
          <p className="lede">{p.claim} {p.body}</p>

          <Image src={p.image} alt={p.alt} width={943} height={621} sizes="(min-width:880px) 68ch, 100vw" priority />

          <ul className="prod-points">
            {p.points.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <p className="prod-for"><span>{P.forLabel}</span>{p.for}</p>
          <Link className="btn" href="/#tilbud">{UI.cta}</Link>
        </div>
      </main>

      <Faq />
    </>
  );
}
