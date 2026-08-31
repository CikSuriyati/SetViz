# SetViz

**Version 1.0** · Interactive Set Theory Learning Tool — a browser-based visualiser that teaches set concepts and Venn diagram notation through progressive, shaded SVG diagrams.

This repository contains **v1.0**, the build submitted to the DIIID 2026 competition. See [Version history](#version-history) for what is in development.

Live site: https://ciksuriyati.github.io/SetViz/
*(GitHub Pages does not serve private repositories on the free plan — the repo must be public, or on a paid plan, for this URL to work.)*

---

## What it is

SetViz is a single-page teaching aid for introductory statistics and discrete mathematics courses. Students step through seven stages (Stage 0–6), click an operation (A ∪ B, A ∩ B, A′, A \ B, A Δ B, …), and immediately see the corresponding region shaded on a Venn diagram — with a plain-language teaching note and the formal symbol shown alongside.

It is deliberately dependency-light: one HTML file, pure SVG rendering, no build step.

## Features

- **Seven progressive stages** (Stage 0–6), from "what is a universal set" to De Morgan's Laws
- **Shaded-region visualisation** built from SVG `clipPath` and `mask` primitives — correct shading for complements, differences and symmetric difference
- **Teaching note** and **symbol notation** panel updated per operation
- **Light / dark mode** toggle
- **User manual** (`SetViz_UserManual.html`) linked from the navigation bar
- Fully static — deployable to GitHub Pages, Vercel, or any static host

### Stage map

| Stage | Title | Concepts covered |
|---|---|---|
| 0 | Orientation | Universal set U, what a set is |
| 1 | One Set (A) | A, A′ (complement) |
| 2 | Two Sets Overlapping | A, B, A′, B′, A ∪ B, A ∩ B |
| 3 | Mutually Exclusive | Disjoint sets, A ∩ B = ∅ |
| 4 | Set Differences | A \ B, B \ A, A Δ B |
| 5 | Subset / Superset | A ⊂ B, A = B, A ⊄ B, disjoint |
| 6 | Complements & De Morgan | (A ∪ B)′ = A′ ∩ B′, (A ∩ B)′ = A′ ∪ B′ |

## Running it

The app is self-contained. The simplest option is to open `index.html` directly in a browser.

To serve it locally over HTTP:

```bash
npm install
npm start          # Express server on http://localhost:3000
```

or with no dependencies at all:

```bash
python3 -m http.server 8000
```

## Deployment

- **GitHub Pages** — serve the repository root; `index.html` is the entry point. Requires a public repo on the free plan.
- **Vercel** — `vercel.json` is already present and configures the `api/` serverless function directory.

## Project structure

```
index.html               Main application (self-contained: markup, styles, and logic)
about.html               About / feature overview page
SetViz_UserManual.html   User manual
server.js                Optional Express server for local static hosting
vercel.json              Vercel configuration
api/stats.js             Placeholder serverless endpoint
```

### Legacy files

`script.js`, `style.css`, `design.html`, `backend-example.js` and `frontend-api-example.js` predate the pure-SVG rebuild and are **not loaded by `index.html`**. They are kept for reference — notably `script.js`, which contains an English/Bahasa Melayu bilingual string table and an eight-step guided tutorial that has not yet been ported to the current version.

## Version history

### v1.0 — current (this repository)

Seven stages (Stage 0–6), recognition-based interaction: the student selects an
operation and the tool shades the matching region. Separate `SetViz_UserManual.html`,
light/dark mode, static hosting. This is the build described in the DIIID 2026
extended abstract.

### v2.0 — in development (not in this repository)

A substantial rework, developed after the competition submission and held back from
deployment until judging concluded. Headline changes:

- **Eleven stages**, adding set notation (∈, ∉, roster and set-builder form), power
  sets, three-set Venn diagrams, counting problems and inclusion–exclusion
- **Production tasks, not just recognition** — students shade a named region
  themselves and name a shaded region, with marking that distinguishes
  over-generalisation from under-generalisation
- **Elements mode** — students enter their own U, A, B (and C); the diagram
  re-arranges to match and n(A ∪ B) = n(A) + n(B) − n(A ∩ B) is evaluated live
- **Ten-item quiz** with review, streak tracking and a three-set hard mode
- **Worksheet generator** — printable practice sheet with a matching answer key
- **Deep links** to a specific stage and operation (`?stage=…&op=…`)
- **Offline capable and installable** via service worker and web manifest
- **Accessibility** — screen-reader region descriptions, keyboard navigation,
  reduced-motion support
- Help built into the application, replacing the separate manual page

Release files: `index.html`, `sw.js`, `manifest.webmanifest`, `icon.svg`.
Deployment supersedes the v1.0 `index.html` and retires `SetViz_UserManual.html`.

## Roadmap

- Deploy v2.0 to a permanent site and redirect from the current address
- Restore bilingual (EN / BM) support, retired in the pure-SVG rebuild
- Interactive booth-game variant for teaching set theory

## Credits

Created by **Suriyati Ujang**. Design approach inspired by ProbViz.

## License

© 2025–2026 Suriyati Ujang. All rights reserved.

| Version | Licence |
|---|---|
| v1.0 (this build, from the relicence commit onward) | [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) |
| v2.0 and later | [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) |
| v1.0 copies obtained before the relicence | MIT (that grant is irrevocable for those copies) |

**CC BY-NC-ND 4.0** — you may use and share SetViz in teaching and private study
provided you credit the author and link the licence. You may not use it commercially,
and you may not distribute modified versions. This covers the source code, the
interface design and the instructional content.

Republishing SetViz under another name, or copying its code, interface design, staged
instructional sequence or visualisation approach into a separate application, is not
permitted. See [`LICENSE`](LICENSE) for the full terms; permission for any other use
must be requested from the copyright holder.
