# Phase 4: MDX Component System

## Summary

Phase 4 added the reusable MDX teaching primitives and separate component mappings for notes and slides. Callouts render in both contexts, while `<Aside>` content is available to notes rendering and omitted from slide rendering.

## Decisions Made

- Implemented the MDX primitives as React components in `src/components/mdx/MdxComponents.jsx` so they can be shared by later MDX rendering routes and tested with the existing React test setup.
- Exported `notesMdxComponents` and `slidesMdxComponents` from the same module to make the rendering context explicit.
- Kept callout behavior shared across notes and slides.
- Implemented slide-only omission of `<Aside>` by mapping it to a component that returns `null`.
- Added light-theme callout and notes-aside styles to the global stylesheet using existing design tokens plus specific accent colors for each callout type.
- Did not add a visual preview route because Phase 4 behavior is reusable infrastructure; visual verification becomes meaningful when the notes and slides routes render MDX in later phases.

## Files Added Or Changed

- `src/components/mdx/MdxComponents.jsx`
- `src/components/mdx/MdxComponents.test.jsx`
- `src/styles/global.css`
- `IMPLEMENTATION_PLANS.md`
- `PHASE-04.md`

## Commands Run

```text
cmd.exe /c npm test -- src/components/mdx/MdxComponents.test.jsx
cmd.exe /c npm test
cmd.exe /c npm run build
```

## Verification

- Focused component tests passed.
  - 1 test file passed.
  - 10 tests passed.
- Full test suite passed.
  - 3 test files passed.
  - 17 tests passed.
- `npm run build` passed.
  - `astro check` reported 0 errors, 0 warnings, and 0 hints.
  - Astro built 1 static page.
- User approved Phase 4 based on test/build verification. There was no meaningful dev-server page to verify because notes and slide routes are scheduled for later phases.

## Known Limitations And Notes

- The MDX component mappings are not wired into pages yet because notes and slide rendering begin in later phases.
- `<Aside>` rendering context is ready, but its placement within segmented notes content will be governed by the Phase 5 parser and Phase 6 notes route.
- Demo component mapping is still unimplemented and remains scheduled for Phase 8.

## Recommended Starting Point For Phase 5

Implement heading-aware module parsing in `src/lib/`, using the existing sample MDX files and the new component mappings as downstream consumers. Add tests for title slide creation, `##` slide segmentation, `###` containment, opening content placement, and malformed heading structures before wiring routes.
