import Image from 'next/image';
import { FAQ, REFS, SPECS } from '@/content/site';
import { Reveal } from './Reveal';

export function Specs() {
  return (
    <section className="section" id="specs" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="head">
          <p className="kicker">{SPECS.kicker}</p>
          <h2>{SPECS.headline}</h2>
          <hr className="edge" />
          <p className="lede">{SPECS.lede}</p>
        </Reveal>

        <Reveal className="specs">
          {SPECS.items.map((s) => (
            <div className="spec" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
              <small>{s.note}</small>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Applications() {
  return (
    <section className="section" id="anvendelse">
      <div className="wrap">
        <Reveal className="head">
          <p className="kicker">{REFS.kicker}</p>
          <h2>{REFS.headline}</h2>
          <hr className="edge" />
          <p className="lede">{REFS.lede}</p>
        </Reveal>

        <Reveal className="refs">
          {REFS.items.map((r, i) => (
            <article className="ref rise" key={r.title}>
              <figure>
                <div className="shot">
                  <span className="badge">{REFS.badge}</span>
                  <Image
                    src={r.image}
                    alt={r.alt}
                    width={r.width}
                    height={r.height}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    sizes="(min-width:880px) 46vw, 100vw"
                  />
                </div>
                <figcaption>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </figcaption>
              </figure>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Real <details>, so it works with the script blocked and the browser's own
 * find-in-page can open an answer. The button inside the summary is there to
 * carry the styling and is hidden from assistive tech; the summary is the
 * control.
 */
export function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <Reveal className="head">
          <p className="kicker">{FAQ.kicker}</p>
          <h2>{FAQ.headline}</h2>
          <hr className="edge" />
          <p className="lede">{FAQ.lede}</p>
        </Reveal>

        <Reveal className="faq">
          {FAQ.items.map((item) => (
            <details className="qa" key={item.q}>
              <summary style={{ listStyle: 'none' }}>
                <button type="button" tabIndex={-1} aria-hidden="true">
                  {item.q}
                  <span className="pm" aria-hidden="true" />
                </button>
              </summary>
              <div className="a"><p>{item.a}</p></div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
