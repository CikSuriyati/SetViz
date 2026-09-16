# SetViz 2.0

**See set theory, don't just memorise it** — a browser-based visualiser that teaches set concepts and Venn diagram notation through interactive, shaded SVG diagrams.

Live site: https://setviz.visuallymath.com

---

## What it is

SetViz is a single-page teaching aid for introductory statistics and discrete mathematics courses. Students step through seven stages, click an operation (A ∪ B, A ∩ B, A′, A − B, A Δ B, …), and immediately see the corresponding region shaded on a Venn diagram — with a plain-language teaching note and the formal notation alongside.

It is deliberately dependency-light: one HTML file, pure SVG rendering, no build step.

## Features

- **Seven stages**, from "what is a set" through three-set diagrams to De Morgan's Laws and a quiz
- **Region-accurate shading** — every operation is composed from atomic Venn regions built with SVG `clipPath` and `mask`, so complements, differences and symmetric difference are exact rather than approximated
- **Two- and three-set diagrams** — three-set stages expose all eight regions, including bracketed expressions such as A ∩ (B ∪ C) and (A ∩ B) − C
- **Relation switcher** — hold an operation fixed and change how the sets sit (overlapping, B ⊂ A, disjoint, A = B) to see how the same notation changes meaning
- **Try with real numbers** — enter your own U, A, B (and C); elements are placed into their correct regions as dots, the result is listed in set notation, and n(A ∪ B) = n(A) + n(B) − n(A ∩ B) is evaluated live
- **De Morgan's Laws** — both identities shown as side-by-side diagrams that shade identically
- **Quiz** — shade-the-region and name-the-region questions, per-region marking, score and streak tracking, and a three-set hard mode
- **Light / dark mode** with the preference remembered, plus arrow-key stage navigation
- **User manual** (`SetViz_UserManual.html`) linked from the header
- Fully static — deployable to GitHub Pages, Vercel, or any static host

### Stage map

| # | Stage | Concepts covered |
|---|---|---|
| 00 | Basics | Universal set U, what a set is, the empty set |
| 01 | Union & Intersection | A ∪ B, A ∩ B, reading ∪ as "or" and ∩ as "and" |
| 02 | Complement & Difference | A′, B′, A − B, B − A, A Δ B, (A ∩ B)′ |
| 03 | Subset & Disjoint | How an operation changes meaning as the arrangement changes |
| 04 | Three Sets | Eight regions; brackets first; A ∩ (B ∪ C), (A ∩ B) − C, (A ∪ B) ∩ C |
| 05 | De Morgan's Laws | (A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′, proved visually |
| 06 | Quiz | Self-check with instant feedback, score and streak |

## Running it

The app is self-contained. The simplest option is to open `index.html` directly in a browser.

To serve it locally over HTTP:

```bash
python3 -m http.server 8000
```

or with the bundled Express server:

```bash
npm install
npm start
```

## Deployment

- **Vercel** — `vercel.json` is already present and configures the `api/` serverless function directory. This is how the live site is hosted.
- **GitHub Pages** — serve the repository root; `index.html` is the entry point. Requires a public repo on the free plan.

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

### v2.0 — current (September 2026)

A substantial rework of the interface and the teaching content.

- Rebuilt on a generic region engine: any operation is defined as a boolean function over atomic Venn regions, which is what makes three-set diagrams and click-to-shade marking possible
- Restructured from nine loosely-grouped stages into seven that build on one another
- Added three-set diagrams, the relation switcher, elements mode, the De Morgan proof stage and the quiz
- New interface — horizontal stage rail, three-column layout, standing symbol reference
- New visual design, with light and dark themes driven by CSS custom properties
- Rewritten user manual

### v1.0 (October 2025 – August 2026)

Seven stages (Stage 0–6), recognition-based interaction: the student selects an operation and the tool shades the matching region. Light/dark mode, static hosting. A separate user manual was added in April 2026.

This is the version entered into the **DIIID 2026** innovation competition, where it was **awarded a Silver medal**, and the build described in the accompanying extended abstract. Relicensed under CC BY-NC-ND 4.0 in August 2026.

## Roadmap

- Set notation (∈, ∉, roster and set-builder form), power sets and inclusion–exclusion counting problems
- Worksheet generator — printable practice sheet with a matching answer key
- Deep links to a specific stage and operation (`?stage=…&op=…`)
- Offline capable and installable via service worker and web manifest
- Accessibility — screen-reader region descriptions and reduced-motion support
- Restore bilingual (EN / BM) support, retired in the pure-SVG rebuild
- Interactive booth-game variant for teaching set theory

## Credits

Design approach inspired by ProbViz.

## License

© 2025–2026 SetViz. All rights reserved.

| Version | Licence |
|---|---|
| v1.0 (from the relicence commit onward) and later | [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) |
| v1.0 copies obtained before the relicence | MIT (that grant is irrevocable for those copies) |

**CC BY-NC-ND 4.0** — you may use and share SetViz in teaching and private study
provided you credit the source and link the licence. You may not use it commercially,
and you may not distribute modified versions. This covers the source code, the
interface design and the instructional content.

Republishing SetViz under another name, or copying its code, interface design, staged
instructional sequence or visualisation approach into a separate application, is not
permitted. See [`LICENSE`](LICENSE) for the full terms; permission for any other use
must be requested from the copyright holder.
