# Phase 5: Module Parsing And Slide Segmentation

## Summary

Phase 5 added a heading-aware MDX source parser that splits one module file into a title slide, ordered `##` slide sections, and notes-friendly opening/section content. The parser enforces the required heading structure without coupling segmentation to Astro rendering.

## Decisions Made

- Implemented parsing in `src/lib/moduleParser.js` as a plain ESM utility so later notes and slide routes can reuse it directly.
- Returned both notes-oriented fields (`title`, `openingContent`, `sections`) and slide-oriented fields (`slides`) from the same parse result.
- Preserved segment `source` strings for each title/section slide so future MDX rendering can compile each slide independently.
- Kept `###` and deeper headings inside the current `##` body by only segmenting on top-level `#` and `##` headings.
- Ignored headings inside fenced code blocks for deterministic Markdown authoring behavior.
- Rejected malformed structures with `ModuleParseError`, including missing `# H1`, content before `# H1`, `##` before `# H1`, empty headings, and multiple `# H1` headings.

## Files Added Or Changed

- `src/lib/moduleParser.js`
- `src/lib/moduleParser.test.js`
- `PHASE-05.md`

## Commands Run

```text
cmd.exe /c npm test -- src/lib/moduleParser.test.js
cmd.exe /c npm test
cmd.exe /c npm run build
```

## Verification

- Focused parser tests passed.
  - 1 test file passed.
  - 9 tests passed.
- Full test suite passed.
  - 4 test files passed.
  - 26 tests passed.
- `npm run build` passed.
  - `astro check` reported 0 errors, 0 warnings, and 0 hints.
  - Astro built 1 static page.

## Known Limitations And Notes

- The parser is not wired into notes or slide routes yet; those routes are scheduled for Phases 6 and 7.
- The parser normalizes CRLF/CR line endings to LF in returned segment strings.
- Segment bodies trim only surrounding blank lines. Internal spacing and Markdown/MDX content are preserved.
- Aside omission remains handled by the MDX component mappings from Phase 4; the parser keeps `<Aside>` content in the section where it was authored.

## Recommended Starting Point For Phase 6

Use `parseModuleSource` from `src/lib/moduleParser.js` when building the notes route. Render the module title, opening content, and ordered `sections`, then derive the table of contents from `sections[].title`.

## Phase Closeout Status

Implementation, tests, and build verification are complete. Marking Phase 5 as `(Implemented)` in `IMPLEMENTATION_PLANS.md` and committing the changes are still pending user verification, as required by the phase execution protocol.
