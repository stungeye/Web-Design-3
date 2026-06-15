# Sliders Specification

## Purpose

Sliders is an experimental static teaching-notes and lecture-slide system for college web design courses. It is intended for instructors who want to author one module file and publish both:

- a student-facing, accessible, scrollable notes page
- a classroom-facing slide view for lecture delivery

The initial target course is Web Design 3 for the Creative Arts Interaction Design program at Red River College. The course focuses on semantic HTML, accessibility, CSS Grid, Flexbox patterns, and fluid layouts.

Sliders should preserve the simplicity of Markdown-based authoring while supporting embedded interactive CSS teaching demos as first-class content.

## Background Context

The project is informed by several previous teaching-note systems:

- A Rails/S5 slide system built from Markdown blobs, with syntax highlighting, handout/notes content, outline mode, and CodePen embeds.
- Jekyll/Just the Docs course notes, with long-form pages, course navigation, table of contents, callouts, code examples, and GitHub Pages hosting.
- Marp slide decks, with Markdown slide authoring, GitHub Pages deployment, and generated PDFs.
- A standalone CSS Grid Explorer prototype that combines interactive controls, visual output, and generated HTML/CSS code panes.

Sliders is a new system. It may borrow ideas from Marp, but it does not need to be Marp-compatible if doing so adds complexity.

## Recommended Stack

The preferred implementation is:

- Astro for the static site shell, routing, build, assets, and GitHub Pages output.
- MDX for module authoring, Markdown content, and component embedding.
- React for interactive demo components.
- Shiki or Astro's built-in syntax highlighting pipeline for fenced code blocks.
- GitHub Actions for deployment.

This stack is recommended because it supports static hosting, local development, Markdown/MDX authoring, relative image assets, and interactive React islands without requiring a backend or turning the whole notes site into a client-rendered app.

## Implementation Principles

Implementing agents should prefer:

- Well-documented conventions over configuration files and option-heavy APIs.
- The smallest design that fully satisfies each required feature.
- Explicit, readable code over clever, compressed, or highly abstract code.
- Local reasoning over hidden coupling.
- Safe seams that make future changes easier without adding speculative architecture.
- Red/green test-driven development where practical.
- Names that explain intent.
- Functions and composables with one clear job.
- Straightforward control flow.
- State transitions that are easy to trace.
- Tests that describe behavior instead of implementation trivia.
- Code that a fresh reviewer can scan without reconstructing hidden assumptions.

Implementing agents should avoid:

- Speculative abstractions.
- Local kludges for discovered issues. Prefer understanding the underlying cause and making the smallest coherent fix.
- Configuration surfaces that exist only because they might be useful later.
- Cross-cutting behavior that is hard to find from the file or component being edited.
- Premature generalization beyond the one-course MVP.

When choosing between two correct implementations, prefer the one that is easier to review and safer to modify.

If a file is becoming harder to follow, extract or reshape just enough to restore clarity. Do not over-fragment code into vague helpers.

## Development Workflow

Use red/green TDD where practical:

1. Write a focused failing test for the behavior being added or changed.
2. Implement the smallest coherent change that makes the test pass.
3. Refactor only when the passing tests protect the intended behavior.

This is especially important for parsing module structure, deriving routes, extracting titles/headings, hiding `<Aside>` content from slides, resolving demo components, sorting units/modules, and rendering callouts.

For visual design, layout tuning, and interactive demo ergonomics, use pragmatic verification in addition to tests. Prefer component tests for deterministic behavior and browser/screenshot checks for layout-sensitive work when the tooling is available.

## Core Goals

- One source `.mdx` file per teaching module.
- Two generated views per module:
  - notes/article view
  - slide view
- Static output suitable for GitHub Pages.
- Simple VS Code authoring workflow.
- Fast local dev server.
- Embedded React demos inside modules.
- Polished fixed light theme.
- Notes view should be solid and simple for accessibility.
- Slide view should be useful for projector-based classroom delivery.

## Non-Goals

- Backend services.
- Editable HTML/CSS playgrounds in the MVP.
- Shareable demo state URLs in the MVP.
- Slide fragments/reveals.
- Instructor-only notes.
- PDF generation.
- Printable slide styling.
- Automated accessibility build gates in the MVP.
- Course-wide search in the MVP.
- CodePen support in the MVP.

## Content Model

Modules are authored as MDX files. Each module represents one teaching unit/module page.

Heading semantics:

- `#` is the module title and becomes the title slide.
- Text after the `#` and before the first `##` belongs to the title slide and the opening of the notes page.
- `##` starts a new slide and a new main notes section.
- `###` and deeper headings are normal subheadings within the current slide/section.
- Headerless slides are not allowed.

Example:

````mdx
# CSS Grid

Grid gives us two-dimensional layout control.

## Grid Containers

A grid starts with `display: grid`.

```css
.gallery {
  display: grid;
}
```

<Note>
Grid layout applies to the direct children of the grid container.
</Note>

<Aside>
This longer student-facing explanation appears only in the notes view.
</Aside>

## Template Areas

<GridExplorer />

<Warning>
Named grid areas must form rectangles.
</Warning>
````

## File And URL Conventions

Configuration should prefer file and folder conventions over frontmatter.

Recommended source structure:

```text
src/
  content/
    units/
      01-semantic-html/
        01-introduction.mdx
        02-document-structure.mdx
      02-css-layout/
        01-grid.mdx
        02-flexbox.mdx
  demos/
    GridExplorer/
      GridExplorer.jsx
      GridExplorer.css
    FlexShelf/
      FlexShelf.jsx
      FlexShelf.css
```

Ordering:

- Unit order comes from numeric folder prefixes.
- Module order comes from numeric file prefixes.
- Display titles come from the module `# H1`, not the filename.

URLs keep numeric prefixes:

- `/02-css-layout/01-grid/`
- `/02-css-layout/01-grid/slides/`

The course index should list units and module titles. Numeric prefixes do not need to appear as visible text; ordered lists or layout can communicate sequence.

## Notes View

The notes view is the primary student-facing accessible output.

Requirements:

- Render as one scrollable article.
- Include the module title.
- Include all `##` sections in source order.
- Include a table of contents.
- A sticky side TOC is preferred when useful and unobtrusive on larger screens.
- On smaller screens, the TOC can appear near the top or collapse into a simpler form.
- Render `<Aside>` content immediately after the slide content it belongs to.
- Render callouts inline.
- Render demos inline.
- Use semantic HTML where practical.
- Use syntax-highlighted fenced code blocks.
- Support local images relative to the module file.

## Slide View

The slide view is for classroom lecture delivery.

Requirements:

- Generate one slide from the `# H1` title section.
- Generate one slide for each `##` section.
- Omit `<Aside>` content completely.
- Render callouts and demos.
- Support keyboard navigation.
- No dark presentation frame.
- Use the same polished light theme as the notes view.
- No fragments/reveals.
- No headerless slides.
- Instructor will manually manage content length to avoid slide overflow.

Keyboard navigation should at least support:

- Next slide: `ArrowRight`, `ArrowDown`, `PageDown`, Space
- Previous slide: `ArrowLeft`, `ArrowUp`, `PageUp`, Shift+Space
- First slide: Home
- Last slide: End

Visible previous/next controls are not required for MVP.

## Components

MDX components should be used for callouts, notes-only prose, and demos.

### Callouts

Callout components render in both notes and slides.

Required components:

- `<Note>` renders with the visible label `Note:`
- `<Warning>` renders with the visible label `Warning:`
- `<Practice>` renders with the visible label `Best Practice:`
- `<Wait>` renders with the visible label `Wait For It:`

Component syntax is preferred over Markdown container syntax for consistency.

### Notes-Only Prose

`<Aside>` is notes-view-only prose.

Rules:

- Render in notes view.
- Omit from slide view.
- Render immediately after the surrounding slide content.
- Do not automatically add a heading. If the author wants a heading inside the aside, they can include one with Markdown/MDX.

### Demos

Interactive demos are React components embedded directly in MDX.

Authoring target:

```mdx
<GridExplorer />
```

Recommended auto-mapping:

```text
src/demos/GridExplorer/GridExplorer.jsx -> <GridExplorer />
src/demos/FlexShelf/FlexShelf.jsx       -> <FlexShelf />
src/demos/FluidType/FluidType.jsx       -> <FluidType />
```

The build should fail when a module references a demo component that cannot be resolved.

Demo components:

- Own their UI, controls, code panes, and CSS.
- May import their own CSS.
- Should use the same global theme tokens where practical.
- Should be fluid enough for common classroom projector resolutions.
- Should generally place interaction and code panes on the left and visual output on the right.
- Should show generated HTML/CSS by default, with each demo deciding whether code panes can be hidden or collapsed.
- May include copy-code buttons where useful.

Standalone demo test pages should exist and use the same theme shell as the notes site.

## Images And Assets

Modules should support images stored beside the MDX file:

```mdx
![Box model diagram](./box-model.png)
```

Images may also live in subfolders when useful:

```mdx
![Grid area diagram](./images/grid-areas.png)
```

The implementation should rely on the chosen static site tool's normal asset handling rather than inventing a custom image pipeline unless required.

## Syntax Highlighting

Code blocks should follow normal Markdown conventions:

````md
```html
<main>
  <h1>Page title</h1>
</main>
```

```css
.gallery {
  display: grid;
}
```
````

Requirements:

- Syntax highlighting for common web languages, especially `html`, `css`, and `js`.
- Code theme should follow the fixed overall site theme.
- Line highlighting and filename labels are not required for MVP.

## Course Index

The generated course index should be convention-based.

Requirements:

- Scan `src/content/units/**/**/*.mdx`.
- Group modules by unit folder.
- Sort units and modules by numeric prefixes.
- Display unit titles with numeric prefixes removed or visually de-emphasized.
- Display module titles from each module's `# H1`.
- Link each module title to its notes view.

No module frontmatter should be required for MVP.

## Accessibility Direction

Accessibility is important, especially in notes view, because this course teaches semantic HTML and accessibility.

MVP accessibility should be handled by design and code review, not automated build gates.

Guidelines:

- Use semantic landmarks and headings.
- Preserve logical heading order.
- Ensure keyboard access to slide navigation and demo controls.
- Use sufficient contrast.
- Do not rely on color alone in callouts or demos.
- Give interactive controls accessible labels.
- Ensure generated code panes and controls are readable at projector sizes.
- Keep notes content usable without JavaScript where possible, except for explicitly interactive demos.

## Deployment

The project should deploy as a static site to GitHub Pages.

Requirements:

- Local dev server for authoring/testing.
- Static production build.
- GitHub Actions workflow for build and deploy.
- No backend.
- No runtime server assumptions.

## MVP Scope

The first implementation should include:

1. Astro project scaffold with MDX and React support.
2. Fixed polished light theme.
3. Course index generated from unit/module folders.
4. Notes route for each module.
5. Slides route for each module.
6. Heading-based slide parsing.
7. Callout components.
8. `<Aside>` handling.
9. Syntax-highlighted code blocks.
10. Relative module images.
11. React demo auto-registration or an equivalent explicit mapping that preserves simple MDX authoring.
12. Build failure for unresolved demo components.
13. Standalone demo test routes.
14. One or two sample modules.
15. One sample demo, likely a cleaned-up Grid Explorer.
16. GitHub Actions deploy workflow.

## Decisions Captured

- Project name: Sliders.
- This is a new system, not a forced Marp extension.
- One file per module is strongly preferred.
- MDX is acceptable and preferred because it is proven and supports component embedding.
- Interactive demos should be embedded directly in module content.
- Demo authoring should be simple, ideally `<GridExplorer />`.
- Demo components should be React by default.
- No editable HTML/CSS in demos for MVP.
- No shareable demo state URLs for MVP.
- GitHub Pages is the likely host.
- No backend.
- VS Code authoring is fine.
- Fast local dev server is enough; live preview beyond that is not required.
- Required content primitives are callouts, syntax-highlighted code, prose explanations, images, and embedded interactive tools.
- CodePen support is not required initially.
- Static code snippets are enough; runnable snippets are not required.
- No PDF output needed.
- Notes view should be accessible and semantic.
- Slide accessibility is less critical than notes accessibility, but the slide view should still be reasonable.
- MVP target is one course.
- `#` creates the title slide and module title.
- `##` creates each slide.
- `###` and deeper headings remain inside the current slide.
- Headerless slides are not allowed.
- Notes-only prose appears only in notes mode.
- Callouts appear in both notes and slides.
- Notes page should be one long article with TOC.
- Modules are organized by unit.
- Course index should show all units and modules.
- Folder/file conventions are preferred over frontmatter.
- URLs keep numeric prefixes.
- Display text should not show numeric prefixes unless useful for sequence.
- Sticky side TOC is acceptable if unobtrusive.
- Slides URL is nested under the notes URL at `/slides/`.
- No printable slide work.
- Callouts should be components, not Markdown containers.
- The visible label for `<Wait>` is `Wait For It:`.
- Standalone demo pages are useful for testing.
- Images should be supported from day one and can live beside the MDX file.
- Demo layout should generally put interaction/code panes on the left and output on the right.
- Demos should work fluidly at common overhead projector resolutions.
- Accessibility should be handled by design and review for now.

## Open Implementation Questions

These are intentionally left for the implementation phase:

- Exact Astro route implementation for deriving notes and slides from the same MDX source.
- Whether demo auto-registration is implemented through generated imports, MDX provider mapping, Vite `import.meta.glob`, or an explicit registry generated at build time.
- How strict slide overflow detection should be, if any.
- Whether the sticky TOC is hand-built or uses an existing Astro integration.
- Exact visual design tokens and typography.
- Whether React or Preact should be used if bundle size becomes a concern.
