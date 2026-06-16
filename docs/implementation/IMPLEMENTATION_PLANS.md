# Sliders Implementation Plans

This file translates `README.md` and `docs/implementation/SPEC.md` into executable implementation phases. The goal is to build the MVP in small, reviewable increments while preserving the project direction: Astro, MDX, React demos, static output, simple authoring, and a polished fixed light theme.

## Phase Execution Protocol

Each implementation phase is intended to be carried out by an agent in a fresh new conversation. The agent should begin by reading `README.md`, `docs/implementation/SPEC.md`, this plan, and any prior phase context files before making changes.

At the end of each phase, the agent must ask the user to verify the system as it exists at that point. If the user agrees that the phase is complete, the agent must preserve important implementation context in a phase-specific markdown file, using this naming pattern:

```text
docs\implementation\PHASE-01.md
docs\implementation\PHASE-02.md
docs\implementation\PHASE-03.md
```

The phase context file should capture the decisions made, files changed, commands run, tests or checks performed, known limitations, and the recommended starting point for the next phase.

If implementation work changes the plan, project direction, requirements, or important usage instructions, the agent must confirm with the user and then update `README.md`, `docs/implementation/SPEC.md`, or this implementation plan as appropriate before closing the phase.

If a dev server was spawned for user testing, be sure to shut it down now.

The final act for an approved phase is to mark the phase (Implemented) in these plans, and add/commit the phase changes to git. The commit should include the implementation work, the phase context file, and any documentation updates required by decisions made during the phase.

## Guiding Constraints

- Author one `.mdx` file per teaching module.
- Generate two views from the same source: notes and slides.
- Prefer file and folder conventions over frontmatter.
- Keep the MVP scoped to one course.
- Use Astro for static generation, MDX for content, and React for interactive demos.
- Avoid backend assumptions, runtime servers, PDF generation, search, slide fragments, and CodePen support in the MVP.
- Use red/green tests where practical for parsing, routing, ordering, component behavior, and rendering rules.

## Phase 1: Project Scaffold (Implemented)

### Goals

- Create the Astro project foundation.
- Add MDX and React support.
- Establish the source layout expected by the spec.
- Configure a static production build suitable for GitHub Pages.

### Tasks

- Initialize Astro in the existing repository.
- Install and configure:
  - `@astrojs/mdx`
  - `@astrojs/react`
  - a test runner appropriate for Astro utility and component behavior
- Create the initial source tree:

```text
src/
  content/
    units/
  components/
  demos/
  layouts/
  lib/
  pages/
  styles/
```

- Add a global stylesheet with initial theme tokens.
- Configure syntax highlighting for common web languages.
- Add baseline npm scripts for development, build, preview, and tests.

### Acceptance Criteria

- `npm run dev` starts a local Astro dev server.
- `npm run build` produces static output.
- MDX pages can render Astro and React components.
- The project has a clear place for content, routes, shared components, demo components, and parsing utilities.

## Phase 2: Sample Content And Content Discovery (Implemented)

### Goals

- Add one or two realistic sample modules.
- Implement convention-based discovery of units and modules.
- Extract display titles from each module's `# H1`.

### Tasks

- Create sample unit folders using numeric prefixes, for example:

```text
src/content/units/
  01-semantic-html/
    01-introduction.mdx
  02-css-layout/
    01-grid.mdx
```

- Add sample content with:
  - one `#` module title
  - at least two `##` slide sections
  - one `###` subsection
  - fenced `html` and `css` code blocks
  - one relative image reference if a suitable sample asset is added
  - callouts
  - an `<Aside>`
  - one demo placeholder
- Build utility functions to:
  - scan direct `.mdx` module files under `src/content/units/{unit}/`
  - sort unit folders by numeric prefix
  - sort modules by numeric prefix
  - derive route slugs from folders and filenames
  - remove or de-emphasize numeric prefixes for display unit titles
  - read module titles from the first `# H1`

### Tests

- Unit ordering follows numeric folder prefixes.
- Module ordering follows numeric file prefixes.
- Module display titles come from `# H1`, not filenames.
- Missing `# H1` fails clearly.
- Route paths retain numeric prefixes.

### Acceptance Criteria

- Course content can be discovered without frontmatter.
- A course index data structure can be generated from files alone.
- Invalid or incomplete module structure fails with useful errors.

## Phase 3: Course Index (Implemented)

### Goals

- Build the generated course index.
- Group modules by unit and link each module to its notes view.

### Tasks

- Implement the root page at `/`.
- Render units in sorted order.
- Render module links using titles extracted from `# H1`.
- Hide numeric prefixes in visible unit titles unless the design uses sequence numbering intentionally.
- Keep the page semantic and accessible.

### Acceptance Criteria

- `/` lists every discovered module.
- Each module title links to its notes route.
- Unit and module order match folder and file prefixes.

## Phase 4: MDX Component System (Implemented)

### Goals

- Provide the required teaching primitives.
- Make component behavior consistent across notes and slides.

### Tasks

- Implement callout components:
  - `<Note>` with label `Note:`
  - `<Warning>` with label `Warning:`
  - `<Practice>` with label `Best Practice:`
  - `<Wait>` with label `Wait For It:`
- Implement `<Aside>` as notes-only prose.
- Create MDX component mappings for notes and slides.
- Ensure callouts render in both notes and slides.
- Ensure `<Aside>` renders in notes and is omitted from slides.

### Tests

- Each callout renders the correct visible label.
- Callouts preserve child content.
- `<Aside>` renders in notes mode.
- `<Aside>` is absent from slide mode.

### Acceptance Criteria

- Authors can use required MDX primitives directly in module files.
- Notes and slides share components where appropriate.
- Notes-only behavior is controlled by rendering context, not author duplication.

## Phase 5: Module Parsing And Slide Segmentation (Implemented)

### Goals

- Split each MDX module into notes content and slide sections according to heading rules.
- Generate one title slide and one slide for each `##`.

### Tasks

- Implement heading-aware parsing for module source.
- Treat `#` as:
  - the module title
  - the title slide heading
  - the top-level notes title
- Treat content between `#` and first `##` as:
  - opening notes content
  - title slide body
- Treat every `##` as a new slide and notes section.
- Keep `###` and deeper headings inside the current section.
- Reject headerless slides and malformed module structures.

### Tests

- Title slide is generated from the `#` section.
- Each `##` generates exactly one slide.
- `###` headings stay inside the current slide.
- Opening content belongs to the title slide.
- Modules without a `# H1` fail.
- Content before the `# H1` fails or is rejected with a clear error.

### Acceptance Criteria

- Notes and slides are generated from the same source without duplicated authoring.
- Slide segmentation follows the spec exactly.
- Errors are deterministic and useful during authoring.

## Phase 6: Notes View (Implemented)

### Goals

- Build the primary student-facing article view.
- Preserve accessibility and long-form readability.

### Tasks

- Create module notes routes:

```text
/:unit/:module/
```

- Render a semantic article with:
  - module title
  - opening content
  - all `##` sections in source order
  - inline callouts
  - inline demos
  - inline `<Aside>` content
  - syntax-highlighted code blocks
- Add a table of contents from `##` headings.
- Prefer a sticky side TOC on large screens.
- Use a simpler top TOC or collapsed layout on small screens.
- Verify local relative images render through Astro's normal asset handling.

### Acceptance Criteria

- Each module has a working notes page.
- Notes content is scrollable, semantic, and readable.
- TOC links navigate to sections.
- `<Aside>` appears immediately after the surrounding slide content it belongs to.
- Code blocks and local images render correctly.

## Phase 7: Slide View (Implemented)

### Goals

- Build classroom-facing slides from the same module source.
- Add keyboard navigation.

### Tasks

- Create module slide routes:

```text
/:unit/:module/slides/
```

- Render one slide from the title section.
- Render one slide per `##` section.
- Omit all `<Aside>` content.
- Render callouts, code blocks, images, and demos.
- Apply the same polished light theme as notes.
- Avoid a dark presentation frame.
- Add keyboard navigation:
  - next: `ArrowRight`, `ArrowDown`, `PageDown`, Space
  - previous: `ArrowLeft`, `ArrowUp`, `PageUp`, Shift+Space
  - first: Home
  - last: End
- Keep visible previous/next controls out of MVP unless they become necessary for usability.

### Tests

- Slide count matches one title slide plus one slide per `##`.
- `<Aside>` content is absent.
- Keyboard events update the active slide correctly.
- Home and End jump to the first and last slides.
- Shift+Space navigates backward.

### Acceptance Criteria

- Every module has a working slide URL nested under the notes URL.
- Keyboard navigation works without visible controls.
- Slides use a readable light theme suitable for classroom projection.

## Phase 8: Demo Registration And Demo Routes (Implemented)

### Goals

- Support simple MDX demo authoring such as `<GridExplorer />`.
- Fail builds when referenced demos cannot be resolved.
- Provide standalone demo pages for testing.

### Tasks

- Choose the simplest robust demo mapping strategy:
  - generated registry
  - `import.meta.glob`
  - explicit registry
  - MDX provider mapping
- Prefer authoring ergonomics over cleverness.
- Implement initial demo component structure:

```text
src/demos/GridExplorer/
  GridExplorer.jsx
  GridExplorer.css
```

- Add a standalone demo test route using the same theme shell as the notes site.
- Ensure demo components can import their own CSS.
- Ensure unresolved demo component references produce clear build failures.

### Tests

- Known demo names resolve successfully.
- Unknown demo names fail clearly.
- Standalone demo routes render.

### Acceptance Criteria

- A module can embed `<GridExplorer />`.
- Demo registration is easy to understand and maintain.
- Demo failures happen at build time, not silently at runtime.

## Phase 9: First Interactive Demo (Implemented)

### Goals

- Build or adapt the first sample demo, likely Grid Explorer.
- Establish conventions for future React teaching demos.

### Tasks

- Implement a cleaned-up `GridExplorer` demo with:
  - controls
  - visual output
  - generated HTML and CSS panes
  - accessible labels
  - responsive layout
  - projector-friendly sizing
- Place controls and code panes generally on the left.
- Place visual output generally on the right.
- Add copy-code buttons only if they are useful and low-cost.
- Reuse global theme tokens where practical.

### Verification

- Demo renders inside notes.
- Demo renders inside slides.
- Demo renders on its standalone route.
- Controls are keyboard accessible.
- Code panes remain readable at common classroom widths.

### Acceptance Criteria

- The first demo is useful as a real teaching aid.
- The implementation becomes a pattern for additional demos without becoming a framework.

## Phase 10: Theme And Accessibility Pass (Implemented)

### Goals

- Make the MVP feel polished, stable, and readable.
- Review the notes experience for semantic accessibility.

### Tasks

- Define global theme tokens for:
  - typography
  - spacing
  - borders
  - callout accents
  - code blocks
  - focus states
  - slide sizing
- Use a fixed light theme only.
- Ensure sufficient contrast.
- Preserve logical heading order.
- Add visible focus styles.
- Ensure slide navigation and demo controls are keyboard accessible.
- Avoid relying on color alone in callouts and demos.
- Keep notes usable without JavaScript except for interactive demos.

### Acceptance Criteria

- Notes are readable and accessible by design review.
- Slides are projector-friendly and keyboard navigable.
- UI styling is consistent across index, notes, slides, and demo pages.

## Phase 11: Deployment (Implemented)

### Goals

- Publish static output to GitHub Pages.
- Keep local development and production build commands straightforward.

### Tasks

- Configure Astro for the expected GitHub Pages base path.
- Add a GitHub Actions workflow to build and deploy static output.
- Document deployment assumptions in the README if needed.
- Confirm static output does not require a backend.

### Acceptance Criteria

- The site builds in CI.
- GitHub Actions can deploy to GitHub Pages.
- Production URLs preserve the planned route shape.

## MVP Completion Checklist

- Astro scaffold with MDX and React support.
- Fixed polished light theme.
- Course index generated from unit and module folders.
- Notes route for each module.
- Slides route for each module.
- Heading-based slide parsing.
- Required callout components.
- Notes-only `<Aside>` behavior.
- Syntax-highlighted code blocks.
- Relative module images.
- React demo registration or equivalent simple mapping.
- Clear build failure for unresolved demo components.
- Standalone demo test routes.
- One or two sample modules.
- One sample demo.
- GitHub Actions deploy workflow.

## Deferred Work

- Editable HTML/CSS playgrounds.
- Shareable demo state URLs.
- Slide fragments or reveals.
- Instructor-only notes.
- PDF generation.
- Printable slide styling.
- Automated accessibility build gates.
- Course-wide search.
- CodePen support.
- Slide overflow detection beyond manual authoring discipline.

## Resolved Implementation Decisions

- Notes and slides are derived from the same direct unit-level MDX module files through Astro's MDX pipeline.
- Course discovery intentionally scans only direct `.mdx` children of each unit folder; nested folders are for assets unless nested routing is added later.
- Demo mapping uses the explicit registry in `src/lib/demoRegistry.js`.
- Unknown uppercase MDX component tags fail validation unless they are known teaching primitives or registered simple PascalCase demos.
- The notes table of contents is custom and based on plain text `##` headings.
- Slides use browser-side DOM grouping in `src/lib/slideDeckController.js`, guarded by `data-expected-slide-count`.
- Final visual design tokens and typography live in `src/styles/global.css` as a fixed light theme.
- React remains the demo component runtime for deterministic demo markup, with browser-only behavior attached through registered client enhancement modules on demo-capable routes.
- Malformed content validation covers the required heading rules and demo-reference contract; richer authoring validation is deferred until content needs it.

## Recommended First Work Slice

The first implementation slice should keep risk low and prove the architecture:

1. Scaffold Astro with MDX and React.
2. Add two sample MDX modules.
3. Implement content discovery and title extraction with tests.
4. Render the course index.
5. Render a basic notes route.

After that slice works, implement slide segmentation, `<Aside>` behavior, and keyboard slide navigation as the next coherent unit.
