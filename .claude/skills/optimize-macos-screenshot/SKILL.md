---
name: optimize-macos-screenshot
description: Losslessly shrink PNG screenshots checked into the repo by dropping a fully-opaque alpha channel and re-deflating at zlib level 9, verifying pixel-identity before overwriting. Use when screenshots or PNGs need to be optimized, reduced in file size, or when a macOS screen capture is added to src.
---

# Optimize macOS screenshots

macOS screen captures are written as RGBA PNGs with weak deflate settings. They
typically shrink by ~40% with no pixel changes at all.

## Quick start

```bash
node .claude/skills/optimize-macos-screenshot/scripts/optimize.cjs src/software
```

Takes files or directories. Overwrites in place, only when the result is both
verified identical and smaller. Flags: `--dry-run`, `--keep-icc`.

## What it does

1. **Drops the alpha channel** when every pixel is fully opaque (`sharp.stats().isOpaque`).
   A macOS window capture with a drop shadow has real transparency — that one keeps RGBA.
2. **Re-deflates at `compressionLevel: 9`, `palette: false`.**
3. **Verifies before writing.** Decodes the candidate back to raw pixels and compares a
   SHA-256 against the original's raw pixels (minus alpha, if dropped). Mismatch or no
   size gain means the file is left untouched and reported as skipped.

`sharp` is resolved from the project's `node_modules` (this repo gets it via
`@11ty/eleventy-img`).

## Rules

- **Never pass `effort`, `quality`, `colours` or `dither` to sharp's `png()`.** Any of
  them implicitly flips `palette: true`, which quantises the image to ≤256 colours. The
  output looks like a big lossless win (~-72% on UI screenshots) but is lossy, and the
  banding lands on antialiased text. `palette: false` is set explicitly for this reason.
- **Never convert these screenshots to JPEG.** No alpha, and the gain over an optimized
  PNG is small for flat UI.
- **Do not downscale the sources.** `.eleventy.js` renders widths up to 1600 via
  `eleventyImageTransformPlugin`; sources need to stay at least that wide.
- Report the real percentage from the script output. Do not estimate it.

## ICC profiles

macOS embeds an Apple RGB/Display P3 profile. The script strips it by default: pixel
values are unchanged, and `eleventyImageTransformPlugin` already re-encodes to
profile-free WebP/JPG, so the served output is unaffected.

Pass `--keep-icc` when the PNG is consumed directly rather than through eleventy-img —
without the profile, wide-gamut values get read as sRGB and shift.

## If 40% is not enough

`oxipng` brute-forces filter strategies libpng does not try, for another ~10-20%, still
bit-exact:

```bash
brew install oxipng
oxipng -o max --strip safe src/software/*.png
```

Palette quantisation (`pngquant`) reaches ~-72% but is lossy and irreversible in git.
Propose it, with that trade-off stated, rather than applying it unasked.
