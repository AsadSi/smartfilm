# SmartFilm Danmark — Next.js

A ground-up rebuild of the SmartFilm Danmark site: **apple.com's structure**
(full-bleed media, one idea per band, sticky product sub-nav, huge centred
display type, pill buttons and chevron links) dressed in the **live site's
aesthetic** — warm cream ground, champagne gold accent, warm near-black ink,
Cormorant Garamond over Inter.

## Running it

```bash
npm run dev     # http://localhost:3000
npm run build   # static export of all 9 routes
npm run lint
```

## Layout

```
src/
  app/                 one folder per route; each page.tsx holds only metadata
    page.tsx             home
    produkter/           comparison matrix + three product cards
    smart-film/          ┐
    led-film/            ├ all three render <ProductPage slug="…" />
    3d-media-glass/      ┘
    referencer/  om-os/  kontakt/
    globals.css        design tokens + the utilities the whole site is built on
  components/          section-level building blocks
    product/           the product-page sequence
  content/             every string and product fact on the site
```

### Content lives in `src/content`

Nothing user-facing is hard-coded in a component. Copy is authored as
Danish/English pairs (`L('dansk', 'english')`) and resolved through `useT()`,
so the DA/EN switch in the header covers the whole site with no route
duplication. Adding a product is a matter of appending to `PRODUCTS` in
`content/products.ts` and creating a two-line route file.

### Design tokens

`globals.css` defines the palette and the type scale as Tailwind v4 `@theme`
tokens and `@utility` classes (`shell`, `band`, `display-xl`, `eyebrow`, `btn`,
`chev`, …). Components compose those rather than re-deriving spacing and colour,
which is what keeps the eight pages looking like one site.

### Language

The choice is remembered in `localStorage` and applied after first paint, so
the server-rendered Danish never mismatches during hydration.

## Media

`public/assets` holds the product footage and photography. Videos ship an
H.265 source first with an H.264 fallback, and every one carries a poster so
the hero has something to show before it plays.
