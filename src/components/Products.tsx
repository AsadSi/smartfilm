'use client';

import { useT } from './lang';
import { ProductShot } from './ProductShot';
import { Reveal } from './Reveal';

/**
 * The two products side by side: the picture, the name, what it does in one
 * line and a way into its own demonstration further down. The facts and where
 * each one belongs are on its product page.
 *
 * The Smart Film picture is the Smart Film section's frame at rest in both
 * states at once — half matte, half clear — because a still photograph
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
          <p className="lede">{P.lede}</p>
        </Reveal>

        <Reveal className="prods">
          {P.items.map((p, i) => (
            <article className="prod rise" key={p.name}>
              <ProductShot item={p} sizes="(min-width:880px) 46vw, 100vw" />

              <h3><a href={PAGES[i]}>{p.name}</a></h3>
              <p className="prod-claim">{p.claim}</p>
              <a className="more" href={p.href}>{p.cta}</a>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
