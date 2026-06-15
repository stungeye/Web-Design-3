# Phase 2: Sample Content And Content Discovery

## Summary

Phase 2 added realistic sample modules and implemented convention-based content discovery for course units and modules. The discovery utility scans MDX modules from `src/content/units`, sorts units and modules by numeric prefixes, derives route paths that retain those prefixes, removes numeric prefixes from visible unit titles, and extracts module display titles from each module's first `# H1`.

## Decisions Made

- Added plain Node-based discovery utilities in `src/lib/contentDiscovery.js` rather than introducing Astro content collections yet. This keeps the phase focused on file conventions and leaves route rendering decisions for later phases.
- Kept numeric prefixes in route paths, matching the planned URL shape.
- Removed numeric prefixes from display unit titles and preserved common web acronyms such as `HTML`, `CSS`, `JS`, and `MDX`.
- Extracted module titles with a lightweight line scanner that ignores fenced code blocks, avoiding a heavier Markdown parser until heading segmentation work begins in Phase 5.
- Missing `# H1` headings throw `ContentDiscoveryError` with the affected file path.
- Sample modules intentionally include future MDX primitives such as `<Note>`, `<Warning>`, `<Practice>`, `<Wait>`, `<Aside>`, and demo placeholders. They are not rendered yet, so the Phase 4 and Phase 8 implementations still own component behavior and demo resolution.

## Files Added Or Changed

- `src/content/units/01-semantic-html/01-introduction.mdx`
- `src/content/units/01-semantic-html/images/page-regions.svg`
- `src/content/units/02-css-layout/01-grid.mdx`
- `src/lib/contentDiscovery.js`
- `src/lib/contentDiscovery.test.js`
- `PHASE-02.md`

## Commands Run

```text
cmd.exe /c npm test
cmd.exe /c npm run build
node --input-type=module -e "import { getCourseIndex } from './src/lib/contentDiscovery.js'; const index = await getCourseIndex(); console.log(JSON.stringify(index, null, 2));"
```

## Verification

- `npm test` passed.
  - 2 test files passed.
  - 7 tests passed.
- `npm run build` passed.
  - `astro check` reported 0 errors, 0 warnings, and 0 hints.
  - Astro built 1 static page.
- The generated course index currently contains:
  - `Semantic HTML` -> `Semantic HTML Foundations` at `/01-semantic-html/01-introduction/`
  - `CSS Layout` -> `CSS Grid Track Sizing` at `/02-css-layout/01-grid/`

## Known Limitations And Notes

- The root page still renders the Phase 1 scaffold MDX page. Course index rendering begins in Phase 3.
- Sample MDX modules are present but do not yet have generated notes or slide routes.
- Callout components, `<Aside>` behavior, and demo component resolution are intentionally not implemented in this phase.
- The title scanner is intentionally narrow: it finds the first top-level Markdown `# H1` outside fenced code blocks. More complete module validation belongs with the Phase 5 parser.
- Discovery assumes the process runs from the project root, which matches the current npm scripts and Astro workflow.

## Recommended Starting Point For Phase 3

Use `getCourseIndex()` from `src/lib/contentDiscovery.js` in the root page implementation. Replace the scaffold home page with a semantic course index that renders units in order and links each module title to its notes route.
