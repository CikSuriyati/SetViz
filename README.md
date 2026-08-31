# SetViz

**Interactive Set Theory Learning Tool** — a browser-based visualiser that teaches set concepts and Venn diagram notation through progressive, shaded SVG diagrams.

Live site: https://ciksuriyati.github.io/SetViz/
*(GitHub Pages does not serve private repositories on the free plan — the repo must be public, or on a paid plan, for this URL to work.)*

---

## What it is

SetViz is a single-page teaching aid for introductory statistics and discrete mathematics courses. Students step through six stages, click an operation (A ∪ B, A ∩ B, A′, A \ B, A Δ B, …), and immediately see the corresponding region shaded on a Venn diagram — with a plain-language teaching note and the formal symbol shown alongside.

It is deliberately dependency-light: one HTML file, pure SVG rendering, no build step.

## Features

- **Six progressive stages**, from "what is a universal set" to De Morgan's Laws
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

## Roadmap

- Restore bilingual (EN / BM) support in the rebuilt app
- Re-implement the guided tutorial and practice mode
- Interactive booth-game variant for teaching set theory

## Credits

Created by **Suriyati Ujang**. Design approach inspired by ProbViz.

## License

MIT
