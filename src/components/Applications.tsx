'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useT } from './lang';
import { Reveal } from './Reveal';

/**
 * The visualisations. On a wide screen, two by two with the words under each;
 * on a phone, a screen each in a row you swipe sideways, words on the picture,
 * and scrolling down goes straight past it. The count and the thread say where
 * in the row you are, which is all the row needs a script for.
 */
export function Applications() {
  const { REFS } = useT();
  const n = REFS.items.length;
  const [shown, setShown] = useState(0);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const row = e.currentTarget;
    setShown(Math.round(row.scrollLeft / (row.firstElementChild as HTMLElement).offsetWidth));
    row.parentElement!.style.setProperty('--p', (row.scrollLeft / (row.scrollWidth - row.clientWidth || 1)).toFixed(4));
  };

  return (
    <section className="section apps" id="anvendelse">
      <div className="wrap">
        <Reveal className="head">
          <p className="kicker">{REFS.kicker}</p>
          <h2>{REFS.headline}</h2>
          <hr className="edge" />
          <p className="lede">{REFS.lede}</p>
        </Reveal>
      </div>

      <div className="reel">
        <div className="reel-track" onScroll={onScroll}>
          {REFS.items.map((r, i) => (
            <figure className="slide" key={r.title}>
              <div className="shot">
                <Image src={r.image} alt={r.alt} fill sizes="(min-width:820px) 46vw, 100vw" loading={i < 2 ? 'eager' : 'lazy'} />
                <span className="badge">{REFS.badge}</span>
              </div>
              <figcaption>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="reel-count" aria-hidden="true">
          <span>{String(shown + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          <i><b /></i>
        </p>
      </div>
    </section>
  );
}
