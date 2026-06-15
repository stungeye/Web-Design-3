# Phase 6: Notes View

## Summary

Phase 6 added generated notes pages for each discovered module at `/:unit/:module/`. The notes route renders the original MDX module content inside a semantic article, uses the Phase 5 parser for validation and table-of-contents data, and relies on Astro's MDX pipeline for Markdown rendering, syntax highlighting, and relative image asset handling.

## Decisions Made

- Implemented a dynamic Astro route at `src/pages/[unit]/[module]/index.astro` using `getCourseIndex()` for static path generation.
- Rendered the actual imported MDX module instead of re-compiling parsed source segments, preserving Astro's normal handling for code blocks and relative images.
- Used `parseModuleSource()` during route rendering to keep notes pages gated by the same heading validation as slide segmentation.
- Added `buildSectionToc()` and heading-id helpers in `src/lib/headingIds.js` so TOC entries are deterministic and tested.
- Preserved Astro-generated Markdown heading IDs in the notes MDX component mapping so TOC hrefs match rendered `h2` anchors.
- Added `src/lib/moduleNotes.js` as a small route helper for reading and parsing module source without putting Node filesystem imports in Astro frontmatter.
- Added temporary inline placeholders for `GridExplorer` and `SemanticStructureDemo` so the existing sample modules can render before the Phase 8 demo registry and real demo components are implemented.
- Styled the notes page with a readable article column, responsive TOC, sticky side TOC on large screens, skip link, breadcrumbs, responsive images, and demo placeholder treatment.

## Files Added Or Changed

- `src/pages/[unit]/[module]/index.astro`
- `src/components/mdx/createNotesMdxComponents.jsx`
- `src/lib/headingIds.js`
- `src/lib/headingIds.test.js`
- `src/lib/moduleNotes.js`
- `src/styles/global.css`
- `PHASE-06.md`

## Commands Run

```text
cmd.exe /c npm test -- src/lib/headingIds.test.js
cmd.exe /c npm test
cmd.exe /c npm run build
Select-String -Path dist\01-semantic-html\01-introduction\index.html -Pattern 'href="#meaning-before-appearance"|<h2 id="meaning-before-appearance"|notes-aside|_astro/page-regions|astro-code'
Select-String -Path dist\02-css-layout\01-grid\index.html -Pattern 'href="#defining-a-grid"|<h2 id="defining-a-grid"|href="#exploring-track-changes"|<h2 id="exploring-track-changes"|notes-aside|demo-placeholder|astro-code'
npm run dev -- --host 127.0.0.1 --port 4321
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/01-semantic-html/01-introduction/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/02-css-layout/01-grid/
```

## Verification

- Focused heading-id tests passed.
  - 1 test file passed.
  - 3 tests passed.
- Full test suite passed.
  - 5 test files passed.
  - 29 tests passed.
- `npm run build` passed.
  - `astro check` reported 0 errors, 0 warnings, and 0 hints.
  - Astro built 3 static pages: the course index and both module notes pages.
- Static output checks confirmed:
  - TOC hrefs match rendered `h2` IDs.
  - `<Aside>` renders as `.notes-aside`.
  - Syntax-highlighted code blocks render with `astro-code`.
  - The sample relative SVG image is processed into `/_astro/...`.
  - Existing sample demo references render inline placeholders.
- Local dev-server checks confirmed:
  - `/` responds with HTTP 200.
  - `/01-semantic-html/01-introduction/` responds with HTTP 200.
  - `/02-css-layout/01-grid/` responds with HTTP 200.

## Known Limitations And Notes

- Demo placeholders are intentionally temporary. Phase 8 still owns demo registration, unresolved demo failures, and standalone demo routes; Phase 9 still owns the real Grid Explorer implementation.
- The notes route currently renders the whole MDX module in one pass, which is the simplest way to preserve Astro asset handling for notes. Slide rendering may still use parsed segment `source` strings in Phase 7.
- The TOC includes only parsed top-level `##` sections, as required. Deeper headings remain in article content and are not included in the MVP TOC.

## Recommended Starting Point For Phase 7

Create `src/pages/[unit]/[module]/slides/index.astro`, reuse `getCourseIndex()` for static paths and `parseModuleSource()` for slide segments, render one title slide plus one slide per `##`, and use `slidesMdxComponents` so `<Aside>` content is omitted. Add focused keyboard-navigation tests for the client-side slide controller.

## Phase Closeout Status

Implementation, tests, build verification, static output checks, user visual verification, plan marking, and git commit are complete.
