'use client';

import { useT } from './lang';
import { ProductShot } from './ProductShot';
import { Reveal } from './Reveal';

/**
 * The two products side by side, each with what it does, three facts, where it
 * belongs and a way into its own demonstration further down.
 *
 * The Smart Film picture is the Smart Film section's frame at rest in both
 * states at once — one pane matte, one clear — because a still photograph
 * cannot throw the switch, and that contrast is the whole product.
 */
/** The product pages, in the order of PRODUCTS.items. */
const PAGES = ['/led-film', '/smart-film'];

export function Products() {
  const { PRODUCTS: P } = useT();
  return (
    <section className="section" id="produkter">
      <div className="wrap">
        <Reveal className="head">
          <p className="kicker">{P.kicker}</p>
          <h2>{P.headline}</h2>
          <hr className="edge" />
          <p className="lede">{P.lede}</p>
        </Reveal>

        <Reveal className="prods">
          {P.items.map((p, i) => (
            <article className="prod rise" key={p.name}>
              <ProductShot item={p} sizes="(min-width:880px) 46vw, 100vw" />

              <h3><a href={PAGES[i]}>{p.name}</a></h3>
              <p className="prod-claim">{p.claim}</p>
              <p className="prod-text">{p.body}</p>
              <ul className="prod-points">
                {p.points.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <p className="prod-for"><span>{P.forLabel}</span>{p.for}</p>
              <a className="btn btn-line" href={p.href}>{p.cta}</a>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
