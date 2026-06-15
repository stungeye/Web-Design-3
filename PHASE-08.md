# Phase 8: Demo Registration And Demo Routes

## Summary

Phase 8 replaced the temporary MDX demo placeholders with an explicit demo registry, build-time validation for unresolved MDX demo references, and standalone demo routes. Modules can now author demos directly as `<GridExplorer />`, and registered demo components render in notes, slides, and their own `/demos/.../` pages.

## Decisions Made

- Used an explicit registry in `src/lib/demoRegistry.js` instead of generated imports or `import.meta.glob`.
- Kept registration easy to review: each demo has a `name`, `title`, and React component.
- Added `createDemoMdxComponents()` so notes and slides share the same demo component mapping.
- Added `validateDemoReferences()` to scan module MDX source for uppercase component tags outside fenced code blocks.
- Treated built-in teaching components as known MDX components: `Aside`, `Note`, `Practice`, `Wait`, and `Warning`.
- Unknown uppercase MDX components now fail clearly through `DemoResolutionError`.
- Added standalone routes at `/demos/[demo]/`, generated from the registry.
- Added initial lightweight demo components for both existing sample references:
  - `GridExplorer`
  - `SemanticStructureDemo`
- Kept the Phase 9 Grid Explorer behavior intentionally minimal; Phase 9 remains responsible for the full interactive teaching demo.

## Files Added Or Changed

- `src/lib/demoRegistry.js`
- `src/lib/demoRegistry.test.jsx`
- `src/demos/GridExplorer/GridExplorer.jsx`
- `src/demos/GridExplorer/GridExplorer.css`
- `src/demos/SemanticStructureDemo/SemanticStructureDemo.jsx`
- `src/demos/SemanticStructureDemo/SemanticStructureDemo.css`
- `src/pages/demos/[demo]/index.astro`
- `src/components/mdx/createNotesMdxComponents.jsx`
- `src/components/mdx/createSlidesMdxComponents.jsx`
- `src/lib/moduleNotes.js`
- `src/lib/moduleSlides.js`
- `src/styles/global.css`
- `IMPLEMENTATION_PLANS.md`
- `PHASE-08.md`

## Commands Run

```text
cmd.exe /c npm test -- src/lib/demoRegistry.test.jsx src/components/mdx/MdxComponents.test.jsx
cmd.exe /c npm test
cmd.exe /c npm run build
Select-String -Path dist\demos\GridExplorer\index.html -Pattern 'Grid Explorer|grid-explorer|grid-template-columns|Standalone demo'
Select-String -Path dist\02-css-layout\01-grid\index.html -Pattern 'Grid Explorer|grid-explorer|demo-placeholder|Unresolved MDX demo'
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/demos/GridExplorer/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/02-css-layout/01-grid/
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/02-css-layout/01-grid/slides/
```

## Verification

- Focused demo and MDX component tests passed.
  - 2 test files passed.
  - 17 tests passed.
- Full test suite passed.
  - 7 test files passed.
  - 49 tests passed.
- `npm run build` passed.
  - `astro check` reported 0 errors, 0 warnings, and 0 hints.
  - Astro built 7 static pages, including:
    - `/demos/GridExplorer/`
    - `/demos/SemanticStructureDemo/`
    - both module notes pages
    - both module slide pages
- Static output checks confirmed:
  - Standalone Grid Explorer route renders demo markup and generated CSS text.
  - The CSS Grid module notes page renders `GridExplorer` markup.
  - Temporary `demo-placeholder` output is no longer present for the registered Grid Explorer demo.
- Local dev-server checks confirmed HTTP 200 for:
  - `/`
  - `/demos/GridExplorer/`
  - `/02-css-layout/01-grid/`
  - `/02-css-layout/01-grid/slides/`
- User verified the phase and approved closeout.

## Known Limitations And Notes

- The registry is explicit by design. Adding a demo currently requires creating its component folder and adding one entry to `src/lib/demoRegistry.js`.
- `validateDemoReferences()` intentionally scans uppercase MDX component tags outside fenced code blocks. This catches unresolved demo-style components without needing to compile custom MDX in tests.
- The initial `GridExplorer` is a structural placeholder with real controls and visual/code panes, but it is not the full interactive teaching aid. That work remains Phase 9.
- `SemanticStructureDemo` was registered because existing sample content referenced it.

## Recommended Starting Point For Phase 9

Build the full `GridExplorer` interaction inside `src/demos/GridExplorer/`. Preserve the current registry contract and standalone route, then make the controls actually update the visual output and generated code panes. Verify it in notes, slides, and `/demos/GridExplorer/`.

## Phase Closeout Status

Implementation, tests, production build, local route verification, user verification, plan marking, and git commit are complete.
