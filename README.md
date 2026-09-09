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

## Two design languages, one project

`src/app` has **no top-level `layout.tsx`**. Instead there are two route groups,
each of which is its own root layout, its own stylesheet and its own font stack:

| group   | routes                        | stylesheet | look                                    |
| ------- | ----------------------------- | ---------- | --------------------------------------- |
| `(site)`| the eight live routes         | `globals.css` | the current site — uppercase Inter, blue accent |
| `(v2)`  | `/template`                   | `v2.css`      | the makeover — German-automotive, Archivo display |

They share nothing but `public/assets`, so work on the new design cannot break
the live one. Navigating between the two triggers a full page load, which is the
correct trade while both exist. When `(v2)` wins, `(site)` is deleted and the
group wrapper comes off.

`/template` is `noindex` and exists to be argued about, not shipped.

## Layout

```
src/
  app/
    (site)/            the live site — one folder per route
      layout.tsx         its root layout: Header, Footer, LanguageProvider
      page.tsx           home
      produkter/         comparison matrix + three product cards
      smart-film/        ┐
      led-film/          ├ all three render <ProductPage slug="…" />
      3d-media-glass/    ┘
      kontakt/  privatlivspolitik/
    (v2)/
      layout.tsx         its root layout: Archivo + Inter, v2.css
      template/          the makeover, one page
    api/  robots.ts  sitemap.ts   shared by both groups
    globals.css        (site) design tokens and utilities
    v2.css             (v2) design tokens and utilities
  components/          section-level building blocks
    product/           the product-page sequence
    v2/                the makeover's bands, used only by /template
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
