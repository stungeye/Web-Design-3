# Phase 7: Slide View

## Summary

Phase 7 added generated classroom slide pages for every discovered module at `/:unit/:module/slides/`. Slide pages render from the same MDX module source as notes, use a slide-specific MDX component mapping that omits `<Aside>`, and add keyboard navigation without visible previous/next controls.

## Decisions Made

- Implemented the nested slide route at `src/pages/[unit]/[module]/slides/index.astro`.
- Reused `getCourseIndex()` for static path generation so slide URLs are generated beside notes URLs.
- Added `getModuleSlidesData()` in `src/lib/moduleSlides.js` to read and parse module source for validation and slide count metadata.
- Rendered the original MDX module through Astro rather than recompiling parsed slide source, preserving Astro's normal handling for syntax highlighting and relative image assets.
- Added `createSlidesMdxComponents()` so callouts and temporary demo placeholders render in slides while `<Aside>` is omitted.
- Added `src/lib/slideDeckController.js` as a plain browser module that wraps rendered `h1` and `h2` ranges into one active slide at runtime.
- Supported the required keyboard navigation:
  - Next: `ArrowRight`, `ArrowDown`, `PageDown`, Space
  - Previous: `ArrowLeft`, `ArrowUp`, `PageUp`, Shift+Space
  - First: Home
  - Last: End
- Kept keyboard events from being intercepted when they originate inside interactive elements.
- Preserved a readable non-JavaScript fallback: the slide page renders as linear MDX content before the controller groups slides.
- Integrated user verification feedback by removing the slide top context bar, making the slide count a compact bottom-right overlay, maximizing vertical slide space, allowing slide `h1` text to use full width, and adding slide links from the course index.

## Files Added Or Changed

- `src/pages/[unit]/[module]/slides/index.astro`
- `src/components/mdx/createSlidesMdxComponents.jsx`
- `src/components/mdx/createNotesMdxComponents.jsx`
- `src/lib/moduleSlides.js`
- `src/lib/slideDeckController.js`
- `src/lib/slideDeckController.test.js`
- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`
- `src/styles/global.css`
- `IMPLEMENTATION_PLANS.md`
- `PHASE-07.md`

## Commands Run

```text
cmd.exe /c npm test -- src/lib/slideDeckController.test.js
cmd.exe /c npm test
cmd.exe /c npm run build
Select-String -Path dist\01-semantic-html\01-introduction\slides\index.html -Pattern 'data-expected-slide-count="3"|data-slide-source|notes-aside|_astro/page-regions|astro-code|SemanticStructureDemo|Slide 1 of'
Select-String -Path dist\02-css-layout\01-grid\slides\index.html -Pattern 'data-expected-slide-count="3"|data-slide-source|notes-aside|demo-placeholder|astro-code|Grid Explorer'
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/01-semantic-html/01-introduction/slides/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/02-css-layout/01-grid/slides/
```

## Verification

- Focused slide controller tests passed.
  - 1 test file passed.
  - 13 tests passed.
- Full test suite passed.
  - 6 test files passed.
  - 42 tests passed.
- `npm run build` passed.
  - `astro check` reported 0 errors, 0 warnings, and 0 hints.
  - Astro built 5 static pages: the course index, both module notes pages, and both module slide pages.
- Static output checks confirmed:
  - Both sample modules have generated `/slides/` routes.
  - Slide count metadata matches one title slide plus one slide per `##`.
  - `<Aside>` content is absent from slide output.
  - Syntax-highlighted code blocks render with `astro-code`.
  - The sample relative SVG image is processed into `/_astro/...`.
  - Temporary demo placeholders render in slides.
- Local dev-server checks confirmed:
  - `/` responds with HTTP 200 and includes Notes and Slides links.
  - `/01-semantic-html/01-introduction/slides/` responds with HTTP 200.
  - `/02-css-layout/01-grid/slides/` responds with HTTP 200.
- User verified the slide behavior and approved the phase after the requested visual/layout refinements.

## Known Limitations And Notes

- Slide grouping currently happens in a small client-side controller after Astro renders the MDX. This preserves Astro asset handling and keeps the route simple, but JavaScript is required for one-slide-at-a-time navigation.
- Slide overflow detection is still deferred. Authors are expected to manage slide content length manually for now.
- Temporary demo placeholders remain until Phase 8 and Phase 9 add real demo registration and the first interactive demo.
- The slide counter is intentionally compact and visible as an overlay rather than a full control bar.

## Recommended Starting Point For Phase 8

Implement demo registration and standalone demo routes. Replace the temporary `GridExplorer` and `SemanticStructureDemo` placeholders with the chosen demo mapping strategy, ensure unresolved demo references fail clearly at build time, and keep the same MDX component ergonomics for notes and slides.

## Phase Closeout Status

Implementation, tests, build verification, dev-server verification, user visual verification, plan marking, and git commit are complete.
