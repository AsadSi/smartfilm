---
workflow: general-video
flow: automation
storyboard: no
message: "SmartFilm glass looks like ordinary glass until it is switched on."
destination: website hero background (smartfilmdanmark.dk), muted autoplay loop
aspect: "16:9"
length: 14.75s seamless loop
language: none (no words in the picture; the headline is page text, DA/EN)
---

## Intent

"Lights on". Since v6 it opens on the lit facade (the dark, colourless start
and its colour-reveal sweep were removed), runs through the client's clips and
the two smart-film rooms, and crossfades back to the facade's first frame so
the loop has no seam. Chosen because the brief was a video "not just for one
language"; plan approved 2026-10-19.

## Assets

- `assets/facade.mp4`: Higgsfield `2026-10-11 step2/hero-facade.mp4`, re-encoded H.264
- `assets/glass.mp4`: Higgsfield `2026-10-11 step2/glass-switch.mp4`, re-encoded H.264
- `assets/facade-first.jpg`: frame 0 of facade.mp4, the loop's closing still
- `assets/client-mall.mp4`: the client's own clip (WhatsApp, 2026-10-19 23:33), 1080p HEVC re-encoded H.264
- `assets/client-street.mp4`: the client's own clip (WhatsApp, 2026-10-20 00:01), a phone screen
  recording: the 648×434 picture cropped out of the letterbox and upscaled to 1920 wide, so it is soft
- No Higgsfield generation (Asad: no credits). The visualisations are left out:
  they carry Danish text in the picture.

## Notes

- Headline stays page text (Asad's choice): crisp, translatable, indexable.
- Keep the action in the middle third: phones crop the 16:9 frame to portrait.
- Delivery: H.264, about 2.5 MB or less, no audio track (v5 at crf 31 is 2.2 MB).

- v3 (Asad: the old hero's mall and jellyfish "look weird") drops them for the clinic pair,
  `assets/clinic-clear.jpg` / `clinic-matte.jpg` from Higgsfield step1 B1/B2. No new generation:
  the Higgsfield subscription has ended.

- v4 (2026-10-20, the client asked for their two videos in the hero) inserts them after the lit
  facade, 3.9–10.5 s. Both carry words in the picture (SMARTFILM DANMARK, Danish shop-window
  copy, a "Gør dine vinduer til oplevelser" mockup); the mall shows its shop signs unblurred.
- v6 (2026-10-20, Asad: "remove" the dark overlay before the colours show, keep it simple, add
  ad-style animation) opens on the lit facade with a pull-back on a speed ramp, a glint across
  the glass and a motion-blurred push into the light leak; the loop ends on the lit first frame.
- v5 (2026-10-20, Asad: cut where the text pops up at 9 s, add smooth animation) stops the
  street clip at 1.3 s of its media, before the mockup headline, slowed to 0.7x; blur crossfades
  replace the plain ones, and the opening gold sweep returns to switch on the clinic.

## Rebuild

The source clips and renders are not in git (about 14 MB). From this folder:

```bash
H=~/Documents/"Higgsfield export/2026-10-11 step2"
ffmpeg -i "$H/hero-facade.mp4" -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p -an assets/facade.mp4
ffmpeg -i "$H/glass-switch.mp4" -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p -an assets/glass.mp4
ffmpeg -i ~/Downloads/VIDEO-2026-10-19-23-33-49.mp4 -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p -an assets/client-mall.mp4
ffmpeg -i ~/Downloads/VIDEO-2026-10-20-00-01-30.mp4 -vf "crop=648:434:0:490,scale=1920:1286:flags=lanczos,unsharp=5:5:0.5" -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p -an assets/client-street.mp4
npx hyperframes render --quality delivery --fps 24 --output renders/hero-v6-master.mp4
ffmpeg -i renders/hero-v6-master.mp4 -c:v libx264 -preset veryslow -crf 31 -profile:v high -pix_fmt yuv420p -movflags +faststart -an ../../public/assets/hero-scrub.mp4
```

The poster (`hero-poster.webp`) is frame 0 of the master, at 1600 px, WebP q66; `hero-static.jpg` is the frame
at 3.3 s; `hero-ending.jpg` is that frame cropped to 1200×630.
