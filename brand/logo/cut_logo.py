"""Cut the client's raster logo (brand guide 1.0, page 3) off its backgrounds.

usage: python -I cut_logo.py <dark-src.png> <light-src.png> <out dir>
(the two halves of the guide PDF's page-3 image: `pdfimages -png` it, then split at
row 413, where the white half ends; needs numpy and pillow)
The dark half is un-screened against its navy gradient (glow keeps its colour),
the light half un-multiplied against white. Writes transparent PNGs with and
without the tagline.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image

dark_src, light_src, out = sys.argv[1], sys.argv[2], Path(sys.argv[3])
out.mkdir(parents=True, exist_ok=True)


def unscreen(path, box, tag_rows, text_x):
    c = np.asarray(Image.open(path).convert('RGB')).astype(np.float32)
    h, w, _ = c.shape
    x0, y0, x1, y1 = box
    # background: per row, interpolate between samples just left and right of the logo
    left = c[:, max(0, x0 - 90):x0 - 10].mean(axis=1)
    right = c[:, x1 + 10:x1 + 90].mean(axis=1)
    t = np.clip((np.arange(w) - (x0 - 50)) / ((x1 + 50) - (x0 - 50)), 0, 1)[None, :, None]
    bg = left[:, None, :] * (1 - t) + right[:, None, :] * t
    diff = np.clip(c - bg, 0, None)
    a = np.max(diff / np.maximum(255 - bg, 1), axis=2)
    # the source has a faint panel of haze behind the mark (alpha .03-.09); fade it out
    # with a soft threshold so the real glow, far stronger, keeps its falloff
    k = np.clip((a - 0.06) / 0.10, 0, 1)
    a = a * k * k * (3 - 2 * k)
    f = bg + diff / np.maximum(a, 1e-3)[..., None]
    return finish(f, a, box, tag_rows, text_x)


def unmultiply(path, box, tag_rows, text_x):
    c = np.asarray(Image.open(path).convert('RGB')).astype(np.float32)
    a = np.max((255 - c) / 255, axis=2)
    a = np.where(a < 0.03, 0, a)
    f = 255 - (255 - c) / np.maximum(a, 1e-3)[..., None]
    return finish(f, a, box, tag_rows, text_x)


def finish(f, a, box, tag_rows, text_x):
    # the mark's flare runs past the crop on the left: fade it out instead of cutting it
    a = a.copy(); x0 = box[0]
    a[:, x0:x0 + 80] *= np.linspace(0, 1, 80)[None, :]
    rgba = np.dstack([np.clip(f, 0, 255), np.clip(a, 0, 1) * 255]).astype(np.uint8)
    full = Image.fromarray(rgba, 'RGBA').crop(box)
    no_tag = np.array(full)
    no_tag[tag_rows[0] - box[1]:, text_x - box[0]:, 3] = 0   # tagline lives right of the mark
    lean = Image.fromarray(no_tag, 'RGBA')
    return full, lean.crop(lean.getbbox())


# boxes measured on the guide's image (dark half starts 413 px down)
dark_full, dark_lean = unscreen(dark_src, (290, 4, 1610, 378), (275, 0), 700)
light_full, light_lean = unmultiply(light_src, (380, 8, 1608, 396), (300, 0), 700)

for name, im in (('logo-pdf-dark-tagline', dark_full), ('logo-pdf-dark', dark_lean),
                 ('logo-pdf-light-tagline', light_full), ('logo-pdf-light', light_lean)):
    im.save(out / f'{name}.png', optimize=True)
    print(name, im.size)
