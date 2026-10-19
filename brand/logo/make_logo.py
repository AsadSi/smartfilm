"""Builds every SmartFilm logo SVG from one geometry and Montserrat outlines.

Montserrat (OFL) comes from `npm pack @fontsource/montserrat`; the A in
SMARTFILM is the open Λ of the original artwork, made by dropping the bar.

usage: python -I make_logo.py <fontsource-montserrat/files dir> <out dir>
(needs fonttools and brotli; it writes svg/ files and site-logo.svg flat in
<out dir>, so move them after)

This vector redraw is the ALTERNATIVE logo. The site and the brand guide use
the client's own artwork (cut_logo.py); of this set only smartfilm-favicon.svg
is in use, as the favicon.
"""
import sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import RecordingPen

FONTS, OUT = Path(sys.argv[1]), Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

NAVY, MIDNIGHT, BLUE, CYAN, ICE, GOLD = '#061B30', '#07111F', '#087FC5', '#20C8F1', '#EAF6FC', '#E6B278'

# ---------------------------------------------------------------- the mark
# Two equal panes, point-symmetric, meeting on one diagonal: the S.
W, O, V, SL = 28, 12, 36, 0.68           # pane width, offset, vertical edge, slope
A = (W, 0); B = (0, W * SL); C = (0, W * SL + V); D = (W, V)
line = lambda x: C[1] - SL * x           # the seam both panes share
P = (W + O, line(W + O)); Q = (O, line(O))
R = (O, Q[1] + V); S = (W + O, R[1] - W * SL)
MW, MH = W + O, R[1]                     # 40 x 82.88
F = 17                                   # fillet on the two round corners


def f(n):
    return f'{n:.2f}'.rstrip('0').rstrip('.')


def pt(p):
    return f'{f(p[0])} {f(p[1])}'


def fillet(prev, corner, nxt, t=F, k=.62):
    """Start point and cubic segment rounding `corner` between two edges."""
    import math
    def toward(a, b, d):
        dx, dy = b[0] - a[0], b[1] - a[1]; n = math.hypot(dx, dy)
        return (a[0] + dx / n * d, a[1] + dy / n * d)
    p1, p2 = toward(corner, prev, t), toward(corner, nxt, t)
    c1 = (p1[0] + (corner[0] - p1[0]) * k, p1[1] + (corner[1] - p1[1]) * k)
    c2 = (p2[0] + (corner[0] - p2[0]) * k, p2[1] + (corner[1] - p2[1]) * k)
    return p1, f'C{pt(c1)} {pt(c2)} {pt(p2)}'


b1, bcurve = fillet(A, B, C)
UPPER = f'M{pt(A)}L{pt(b1)}{bcurve}L{pt(C)}L{pt(D)}Z'
s1, scurve = fillet(R, S, P)
LOWER = f'M{pt(R)}L{pt(s1)}{scurve}L{pt(P)}L{pt(Q)}Z'
SEAM = f'M{pt(C)}L{pt(P)}'
# Each pane's inner edge carries on, faintly, through the other: glass on glass.
FACETS = f'M{f(O)} {f(line(O))}V{f(B[1] - SL * O)}M{f(W)} {f(D[1])}V{f(R[1] - SL * (W - O))}'


def mark(kind, uid):
    """Mark body (defs + shapes) in mark units, origin top-left."""
    if kind == 'flat':      # default: crisp at any size, reads on paper and on navy
        return f'''<defs>
<linearGradient id="{uid}u" x1="{f(A[0])}" y1="0" x2="0" y2="{f(C[1])}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="{CYAN}"/><stop offset="1" stop-color="{BLUE}"/></linearGradient>
<linearGradient id="{uid}l" x1="{f(P[0])}" y1="{f(P[1])}" x2="{f(O)}" y2="{f(R[1])}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="{BLUE}"/><stop offset="1" stop-color="{CYAN}"/></linearGradient>
</defs>
<path d="{UPPER}" fill="url(#{uid}u)"/><path d="{LOWER}" fill="url(#{uid}l)"/>
<path d="{SEAM}" stroke="{GOLD}" stroke-width="1.6" stroke-linecap="round"/>'''
    if kind == 'simple':    # the PDF icon's look, flattened for 16-48 px: no glow, no facets
        return f'''<defs>
<linearGradient id="{uid}u" x1="{f(A[0])}" y1="0" x2="0" y2="{f(C[1])}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6CC3FF"/><stop offset=".55" stop-color="{ICE}"/><stop offset="1" stop-color="#FFF1DE"/></linearGradient>
<linearGradient id="{uid}l" x1="{f(P[0])}" y1="{f(P[1])}" x2="{f(O)}" y2="{f(R[1])}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1E74D8"/><stop offset="1" stop-color="{CYAN}"/></linearGradient>
</defs>
<path d="{UPPER}" fill="url(#{uid}u)"/><path d="{LOWER}" fill="url(#{uid}l)"/>
<path d="{SEAM}" stroke="#F2A65A" stroke-width="3" stroke-linecap="round"/>'''
    if kind.startswith('mono'):  # one ink; the seam is a cut, not a line
        ink = NAVY if kind == 'mono-navy' else '#FFFFFF'
        return f'''<defs><mask id="{uid}m" maskUnits="userSpaceOnUse" x="-2" y="-2" width="{f(MW + 4)}" height="{f(MH + 4)}">
<rect x="-2" y="-2" width="{f(MW + 4)}" height="{f(MH + 4)}" fill="#fff"/><path d="{SEAM}" stroke="#000" stroke-width="2.4"/></mask></defs>
<g mask="url(#{uid}m)" fill="{ink}"><path d="{UPPER}"/><path d="{LOWER}"/></g>'''
    dark = kind == 'glass-dark'   # the luminous master, for large sizes only
    edge = ICE if dark else BLUE
    return f'''<defs>
<linearGradient id="{uid}u" x1="{f(A[0])}" y1="0" x2="0" y2="{f(C[1])}" gradientUnits="userSpaceOnUse">
<stop offset="0" stop-color="{'#7CCBFF' if dark else '#4FB2EE'}" stop-opacity=".95"/><stop offset=".55" stop-color="{ICE}" stop-opacity="{'.8' if dark else '.75'}"/><stop offset="1" stop-color="#F7E2C4" stop-opacity=".95"/></linearGradient>
<linearGradient id="{uid}l" x1="{f(P[0])}" y1="{f(P[1])}" x2="{f(O)}" y2="{f(R[1])}" gradientUnits="userSpaceOnUse">
<stop offset="0" stop-color="#1E74D8" stop-opacity=".9"/><stop offset=".5" stop-color="{'#0A4C9E' if dark else BLUE}" stop-opacity=".8"/><stop offset="1" stop-color="{CYAN}"/></linearGradient>
<filter id="{uid}g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="{'1.6' if dark else '.9'}"/></filter>
</defs>
<path d="{UPPER}" fill="url(#{uid}u)" stroke="{edge}" stroke-opacity=".9" stroke-width=".7" stroke-linejoin="round"/>
<path d="{LOWER}" fill="url(#{uid}l)" stroke="{edge}" stroke-opacity=".9" stroke-width=".7" stroke-linejoin="round"/>
<path d="{FACETS}" stroke="{edge}" stroke-opacity=".35" stroke-width=".45"/>
<path d="{SEAM}" stroke="{GOLD}" stroke-width="2.6" stroke-linecap="round" filter="url(#{uid}g)" opacity="{'.9' if dark else '.6'}"/>
<path d="{SEAM}" stroke="{'#FFF3E0' if dark else '#D99A55'}" stroke-width=".9" stroke-linecap="round"/>'''


# ------------------------------------------------------------- the letters
class Face:
    def __init__(self, weight, lambda_a=False):
        self.lambda_a = lambda_a
        self.font = TTFont(FONTS / f'montserrat-latin-{weight}-normal.woff2')
        self.gs = self.font.getGlyphSet(); self.cmap = self.font.getBestCmap()
        self.cap = self.font['OS/2'].sCapHeight

    def run(self, text, x, base, cap, track=0.0):
        """SVG path of `text` with its cap height `cap`, and its ink box."""
        sc = cap / self.cap; d = SVGPathPen(self.gs, ntos=lambda n: f'{n:.1f}'.rstrip('0').rstrip('.')); bp = BoundsPen(self.gs)
        for ch in text:
            g = self.gs[self.cmap[ord(ch)]]
            m = (sc, 0, 0, -sc, x, base)
            rec = RecordingPen(); g.draw(rec)
            ops = rec.value
            if ch == 'A' and self.lambda_a:   # the wordmark's A is an open Λ: drop the bar contour
                ops = ops[:ops.index(('closePath', ())) + 1]
            for pen in (d, bp):
                tp = TransformPen(pen, m)
                for op, args in ops:
                    getattr(tp, op)(*args)
            x += g.width * sc + track * cap
        self.end = x - track * cap
        return d.getCommands(), bp.bounds


BOLD, LIGHT, REG = Face(700, lambda_a=True), Face(300), Face(500)
CAP = 100                                           # SMARTFILM cap height


def wordmark(ink, uid, tagline):
    """SMARTFILM / — DANMARK — [/ tagline], x from 0, top of caps at y=0."""
    smart, b1 = BOLD.run('SMART', 0, CAP, CAP, .06)
    film_x = BOLD.end + .06 * CAP
    film, b2 = BOLD.run('FILM', film_x, CAP, CAP, .06)
    left, right = b1[0], b2[2]
    width = right - left
    out = [f'<defs><linearGradient id="{uid}f" x1="{f(film_x)}" y1="0" x2="{f(right)}" y2="0" gradientUnits="userSpaceOnUse">'
           f'<stop offset="0" stop-color="{BLUE}"/><stop offset="1" stop-color="{CYAN}"/></linearGradient></defs>',
           f'<path d="{smart}" fill="{ink}"/>', f'<path d="{film}" fill="url(#{uid}f)"/>']
    # DANMARK, tracked to sit between two rules that finish flush with the word above
    dcap, dbase = CAP * .4, CAP + CAP * .3 + CAP * .38
    _, db = LIGHT.run('DANMARK', 0, dbase, dcap, .9)
    dw = db[2] - db[0]
    dx = left + (width - dw) / 2 - db[0]
    dan, db = LIGHT.run('DANMARK', dx, dbase, dcap, .9)
    gap, ry = CAP * .28, dbase - dcap / 2
    out += [f'<path d="{dan}" fill="{ink}"/>',
            f'<path d="M{f(left)} {f(ry)}H{f(db[0] - gap)}M{f(db[2] + gap)} {f(ry)}H{f(right)}" stroke="{ink}" stroke-width="{f(CAP * .035)}"/>']
    bottom = dbase
    if tagline:
        tcap = CAP * .2
        for i, words in enumerate(('INTELLIGENTE GLASLØSNINGER', 'TIL FREMTIDENS BYGNINGER')):
            base = dbase + CAP * .42 + tcap + i * tcap * 2.3
            _, tb = REG.run(words, 0, base, tcap, .42)
            tx = left + (width - (tb[2] - tb[0])) / 2 - tb[0]
            t, _ = REG.run(words, tx, base, tcap, .42)
            out.append(f'<path d="{t}" fill="{ink}" fill-opacity=".85"/>')
            bottom = base
    return '\n'.join(out), left, right, bottom


def svg(name, w, h, body, bg=None, title='SmartFilm Danmark'):
    rect = f'<rect width="100%" height="100%" fill="{bg}"/>' if bg else ''
    (OUT / name).write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(w)} {f(h)}" fill="none" role="img">'
        f'<title>{title}</title>{rect}\n{body}\n</svg>\n')


def lockup(name, ink, kind, tagline, bg=None):
    words, left, right, bottom = wordmark(ink, 'w', tagline)
    th = bottom                                   # text block height
    mh = th * (1.25 if tagline else 1.32)         # mark a little taller than the text
    ms = mh / MH
    pad = mh * .14
    gap = mh * (.34 if tagline else .3)
    mx, my = pad, pad
    tx = mx + MW * ms + gap - left
    ty = my + (mh - th) / 2
    w = tx + right + pad
    h = mh + 2 * pad
    body = (f'<g transform="translate({f(mx)} {f(my)}) scale({ms:.4f})">{mark(kind, "m")}</g>'
            f'<g transform="translate({f(tx)} {f(ty)})">{words}</g>')
    svg(name, w, h, body, bg)


# marks
pad = 6
for kind in ('flat', 'glass-dark', 'glass-light', 'mono-navy', 'mono-white'):
    svg(f'smartfilm-mark-{kind}.svg', MW + 2 * pad, MH + 2 * pad,
        f'<g transform="translate({pad} {pad})">{mark(kind, "m")}</g>', title='SmartFilm')

# From 48 px up the icon is the client's own artwork (brand guide 1.0, page 6), cut
# to size into png/. Below that its glow turns to noise, so the favicon is this
# flattened version on the same dark plate and rim.
FS = 64
fs = FS * .8 / MH
svg('smartfilm-favicon.svg', FS, FS,
    f'<rect x=".75" y=".75" width="{FS - 1.5}" height="{FS - 1.5}" rx="{FS * .22:.1f}" fill="{MIDNIGHT}" stroke="#2C5F9E" stroke-width="1.5"/>'
    f'<g transform="translate({(FS - MW * fs) / 2:.3f} {(FS - MH * fs) / 2:.3f}) scale({fs:.4f})">{mark("simple", "m")}</g>', title='SmartFilm')

# lockups
lockup('smartfilm-logo-primary-light.svg', NAVY, 'glass-light', True)
lockup('smartfilm-logo-primary-dark.svg', '#FFFFFF', 'glass-dark', True, bg=MIDNIGHT)
lockup('smartfilm-logo-primary-dark-transparent.svg', '#FFFFFF', 'glass-dark', True)
lockup('smartfilm-logo-light.svg', NAVY, 'flat', False)
lockup('smartfilm-logo-dark.svg', '#FFFFFF', 'flat', False)
lockup('smartfilm-logo-mono-navy.svg', NAVY, 'mono-navy', False)
lockup('smartfilm-logo-mono-white.svg', '#FFFFFF', 'mono-white', False)

# The site's header lockup: ink follows the header (currentColor).
words, left, right, bottom = wordmark('currentColor', 'hw', False)
mh = bottom * 1.32; ms = mh / MH; gap = mh * .3
tx = MW * ms + gap - left
body = (f'<g transform="scale({ms:.4f})">{mark("flat", "hm")}</g>'
        f'<g transform="translate({f(tx)} {f((mh - bottom) / 2)})">{words}</g>')
svg('site-logo.svg', tx + right, mh, body)
print('ok', OUT)
