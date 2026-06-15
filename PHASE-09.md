# Phase 9: First Interactive Demo

## Summary

Phase 9 turned `GridExplorer` from a structural placeholder into the first real interactive teaching demo. The demo now has usable controls, a resizable preview, generated HTML and CSS panes, live Prism syntax highlighting, keyboard-accessible resizing, and focused tests. It renders through the existing demo registry in notes, slides, and the standalone demo route without changing MDX authoring syntax.

## Decisions Made

- Kept the explicit demo registry and `<GridExplorer />` MDX authoring contract from Phase 8.
- Added `prismjs` as an explicit runtime dependency for live demo code highlighting.
- Added a shared `LiveCodeBlock` component and highlighting helper instead of embedding one-off syntax highlighting inside `GridExplorer`.
- Added a small demo client entrypoint from `BaseLayout` so registered demos can progressively enhance server-rendered Astro output.
- Kept `GridExplorer` itself as a React-rendered component for deterministic initial markup and tests.
- Moved browser behavior for dynamic highlighting and preview resizing into `src/demos/GridExplorer/gridExplorerClient.js`.
- Implemented the requested teaching layout:
  - controls on the left
  - preview on the right
  - generated HTML and CSS below, side-by-side on wider screens
- Added a draggable vertical separator between controls and preview.
- Made the separator keyboard accessible with `role="separator"`, ARIA value attributes, and arrow-key resizing.
- Allowed the preview to shrink to a narrow teaching width while preserving a practical minimum width.
- Removed the redundant `Grid controls` heading after user review.

## Files Added Or Changed

- `package.json`
- `package-lock.json`
- `src/components/LiveCodeBlock.jsx`
- `src/components/LiveCodeBlock.css`
- `src/components/LiveCodeBlock.test.jsx`
- `src/demos/GridExplorer/GridExplorer.jsx`
- `src/demos/GridExplorer/GridExplorer.css`
- `src/demos/GridExplorer/GridExplorer.test.jsx`
- `src/demos/GridExplorer/gridExplorerClient.js`
- `src/demos/GridExplorer/gridExplorerClient.test.js`
- `src/layouts/BaseLayout.astro`
- `src/lib/demoClientEntrypoint.js`
- `src/lib/liveCodeHighlighting.js`
- `IMPLEMENTATION_PLANS.md`
- `PHASE-09.md`

## Commands Run

```text
cmd.exe /c npm install prismjs@^1.30.0 --save
cmd.exe /c npm test -- src/demos/GridExplorer/GridExplorer.test.jsx
cmd.exe /c npm test -- src/components/LiveCodeBlock.test.jsx src/demos/GridExplorer/GridExplorer.test.jsx src/demos/GridExplorer/gridExplorerClient.test.js
cmd.exe /c npm test
cmd.exe /c npm run build
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/demos/GridExplorer/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/02-css-layout/01-grid/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/02-css-layout/01-grid/slides/
```

## Verification

- Focused Grid Explorer and live-code tests passed.
- Full test suite passed.
  - 10 test files passed.
  - 56 tests passed.
- `npm run build` passed.
  - `astro check` reported 0 errors, 0 warnings, and 0 hints.
  - Astro built 7 static pages.
- Dev-server route checks confirmed HTTP 200 and expected enhanced Grid Explorer markup for:
  - `/demos/GridExplorer/`
  - `/02-css-layout/01-grid/`
  - `/02-css-layout/01-grid/slides/`
- User verified the demo behavior and approved the phase.

## Known Limitations And Notes

- The demo client entrypoint currently initializes `GridExplorer` directly. Future demos can be added to `setupRegisteredDemos()` without changing MDX authoring.
- `LiveCodeBlock` supports the currently needed `html` and `css` languages. Additional languages can be added through the shared highlighting helper.
- The preview resize handle is intentionally hidden on narrower layouts where the demo stacks vertically.
- The live code panes are display-oriented; copy-code buttons remain deferred because they were not necessary for this phase.

## Recommended Starting Point For Phase 10

Begin the theme and accessibility pass by reviewing the new live code block token colors, the Grid Explorer separator focus/hover states, and the global demo client entrypoint. Then broaden the review across index, notes, slides, callouts, and standalone demo pages for consistent spacing, contrast, and focus treatment.

## Phase Closeout Status

Implementation, tests, production build, local route verification, user verification, plan marking, and git commit are complete.
