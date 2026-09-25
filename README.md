# SmartFilm Danmark

The smartfilmdanmark.dk one-pager, in Next.js. One page plus a privacy
policy, no database, no server state — `npm run build` produces a static page.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## What this is

The site sells two things a pane of glass can be told to do. Transparent LED
film turns the window into a screen; smart film turns it opaque. The page
demonstrates both rather than describing them, which is the whole of its
argument: an LED panel you hold a button to light, and a window whose panes go
matte on a switch.

The copy is the client's own, carried over unchanged from the page this
replaced. The Smart Film section is the one addition.

## Layout

```
src/
  app/
    layout.tsx     fonts, metadata, the remembered colour scheme
    page.tsx       the whole site, in the order it argues
    privatlivspolitik/page.tsx  the privacy policy, linked from the footer
    globals.css    every rule on the page
  components/      one file per section; client only where something moves
  content/site.ts  every Danish word, in one file
  content/en.ts    the English twin, typed against the Danish
public/assets/     the client's own photography and footage
```

`content/site.ts` exists so that changing a sentence is a content edit rather
than a hunt through JSX, and so the whole of what the site claims can be read
in one sitting. `content/en.ts` is typed as the same shape, so a Danish string
without an English one is a type error.

## Danish and English

The globe at the left of the header switches the whole page between Danish
and English in place — no reload, no second URL, scroll position kept. `<html
lang>` is the one source of truth (`components/lang.ts`): the switch writes
it, every component reads it, and a head script in the layout restores the
reader's last choice before the first paint. The server always renders Danish,
which is also what search engines index; English is for the reader, not for
ranking. If an indexable English page is ever wanted, that is `/en` with its
own root layout — a bigger change, deliberately not made.

## The design

Warm paper, one hairline didone capital carrying every headline, and hairlines
instead of boxes — the spec row, the form and the reference badges are all
ruled rather than framed. It came from the Tårn direction in the template set,
with the client's notes applied: lighter, same layout, no fly-through.

The photography is the deliberate exception and stays dark. It is night
footage of a lit facade, because the product it sells only exists after dark,
so the page goes pale around it instead of fighting it.

The header puts the wordmark in the middle with two menu items either side,
and marks the section you are in with the dichroic hairline it already used
for hover. Its breakpoint is measured, not guessed: the outer columns are
symmetric, so the heavier right-hand side is charged twice and the header
needs 1038px before anything touches. Below 1080 a Menu button on the left
drops the full list under the header; on a phone the right side is a call link.

## On a phone

The page was first judged on desktop and read badly on a phone, so these are
deliberate:

- **The two products are named under the hero** (`Products.tsx`), each with
  what it does, three facts, where it belongs and a link into its demo.
- **Both demos stack copy, picture, control** — in that order — so the hold
  button and the matte switch sit right under the thing they change. On a wide
  screen the picture goes back to the left, as approved.
- **The hero text is light on every ground.** The still is dark whatever the
  scheme, and the page's own ink vanished into it.
- **The hero is exactly one screen**, so a "Rul ned" cue at the bottom is the
  only sign there is more. The headline is React Bits' BlurText (`BlurText.tsx`,
  on Motion): the words arrive frosted and settle clear, the Smart Film switch
  played once. The `<noscript>` rule keeps it readable without scripting.
- **The references are a swipe row** under 820px, and the steps put their
  number beside the text instead of above it.
- **In-page links scroll without writing a `#fragment`** to the address bar,
  and one that arrives in a shared link is removed after the jump.
- **The hero video plays on phones too.** Only reduced motion or Save-Data get
  the still (and iOS Low Power Mode, which refuses autoplay by itself).
- **The figures count up** (React Bits' CountUp, `CountUp.tsx`) as they scroll
  in — only the ones of 10 or more. The finished figure is in the HTML.

## Three grounds — DEMO ONLY

A picker sits bottom-right so the client can see the same page on three
grounds: **Dagslys** (warm paper, blue), **Teknisk** (near-black, ice — the
site as it stood before this rebuild) and **Luksus** (warm black, champagne —
the accent from the makeover pitch). Same type, same layout; only the colour
moves, which is the only honest way to judge colour.

Every colour is a custom property, so a theme is a list of values rather than
a search through the stylesheet. Adding a fourth is one block in `globals.css`
and one entry in `THEMES`.

**It is not part of the site.** Four pieces come out together, each marked
`DEMO ONLY`: the `<script>` and the `THEMES`/`ThemePicker` mount in
`layout.tsx` and `page.tsx`, the component itself, and the `.picker` block in
`globals.css`. Delete them and whichever `:root` values you keep become the
single scheme.

## Things worth knowing before touching it

- **The enquiry form opens the sender's own mail client.** No mailbox, no
  relay, no key in an environment variable — and the sender keeps a copy in
  their outbox. The cost is that the page cannot know whether it was sent, so
  it says the mail client opened and claims nothing about delivery. The
  previous project had an `/api/enquiry` route for this; it is gone, and it is
  in git history if it is ever wanted back.
- **The photograph in the Smart Film section is a stand-in.** Every image here
  is an LED visualisation, so it borrows `vis-klinik.jpg` zoomed hard into its
  right-hand third — otherwise "clear" reveals an advert, which is the wrong
  product. It wants one real photograph: a clinic or meeting-room wall, one
  tripod position, shot matte and clear. Then `scale` goes back to `1` in
  `.pane-shot img`.
- **`.rise` starts at opacity 0.** Anything that stops the reveal observer
  running hides the page. Scripting being off is covered by a `<noscript>`
  rule in the layout; a thrown error during hydration is not.
- See `CONTENT-REQUEST.md` for what is still missing from the client.
