---
workflow: general-video
flow: automation
storyboard: no
message: "SmartFilm glass looks like ordinary glass until it is switched on."
destination: website hero background (smartfilmdanmark.dk), muted autoplay loop
aspect: "16:9"
length: 10.2s seamless loop
language: none (no words in the picture; the headline is page text, DA/EN)
---

## Intent

"Lights on". The facade starts with its LED film off (graded dark and
colourless), a soft diagonal sweep switches it on with a warm line at the
edge, the lit facade holds with a slow push-in, then the meeting-room glass
goes clear to matte, and the piece crossfades back to the dark facade so the
loop has no seam. Chosen because the brief was a video "not just for one
language"; plan approved 2026-10-19.

## Assets

- `assets/facade.mp4`: Higgsfield `2026-10-11 step2/hero-facade.mp4`, re-encoded H.264
- `assets/glass.mp4`: Higgsfield `2026-10-11 step2/glass-switch.mp4`, re-encoded H.264
- `assets/facade-first.jpg`: frame 0 of facade.mp4, the loop's closing still
- No Higgsfield generation (Asad: no credits). The visualisations are left out:
  they carry Danish text in the picture.

## Notes

- Headline stays page text (Asad's choice): crisp, translatable, indexable.
- Keep the action in the middle third: phones crop the 16:9 frame to portrait.
- Delivery: H.264, about 2.5 MB or less, no audio track.

- v3 (Asad: the old hero's mall and jellyfish "look weird") drops them for the clinic pair,
  `assets/clinic-clear.jpg` / `clinic-matte.jpg` from Higgsfield step1 B1/B2. No new generation:
  the Higgsfield subscription has ended.

## Rebuild

The source clips and renders are not in git (about 14 MB). From this folder:

```bash
H=~/Documents/"Higgsfield export/2026-10-11 step2"
ffmpeg -i "$H/hero-facade.mp4" -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p -an assets/facade.mp4
ffmpeg -i "$H/glass-switch.mp4" -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p -an assets/glass.mp4
npx hyperframes render --quality delivery --fps 24 --output renders/hero-v3-master.mp4
ffmpeg -i renders/hero-v3-master.mp4 -c:v libx264 -preset veryslow -crf 28 -profile:v high -pix_fmt yuv420p -movflags +faststart -an ../../public/assets/hero-scrub.mp4
```

The poster (`hero-poster.webp`) is frame 0 of the master; `hero-static.jpg` is the frame
at 3.3 s; `hero-ending.jpg` is that frame cropped to 1200×630.
