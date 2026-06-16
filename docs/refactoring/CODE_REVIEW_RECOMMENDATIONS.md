# Code Review Recommendations

## Executive Summary

The codebase is in good MVP health: it is small, readable, convention-driven, and mostly avoids speculative abstraction. The strongest parts are the clear route structure, explicit demo registry, focused parser/discovery utilities, and straightforward Astro static rendering.

The highest-value cleanup is not a rewrite. The main risks are a few places where phase-by-phase implementation left hidden contracts: demos are described as React demos but currently run as server-rendered React plus separate DOM enhancement, every page loads the Grid Explorer enhancement path, content discovery recursively finds files that the route imports cannot render, and documentation still describes several open decisions that have since been resolved.

The most important correctness issue is accessibility in `SemanticStructureDemo`: it renders real landmark elements inside the page preview, which can pollute the actual document landmark structure. The most important maintainability issue is `GridExplorer` splitting the same behavior between React state and a client DOM controller, with duplicated code-generation logic.

## Highest Priority Issues

### HPI-1: Semantic demo uses real page landmarks inside the actual document

- Severity: High
- Type: Accessibility / Bug
- Location: `src/demos/SemanticStructureDemo/SemanticStructureDemo.jsx:5-16`
- Problem: The visual preview renders real `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>` elements inside the site page.
- Why it matters: Notes pages already live inside the layout's real `<main>`. Nesting another `<main>` and extra landmarks for a visual mockup can confuse assistive technology landmark navigation and undermines the accessibility goals of a semantic HTML teaching tool.
- Recommended fix: Keep the visual mockup visible, but remove it from the accessibility tree with `aria-hidden="true"` on the preview container, or render preview boxes as neutral `<div>` elements while keeping the code block as the text representation.
- Refactor risk: Low

### HPI-2: Grid Explorer has two interaction models that can drift

- Severity: High
- Type: Maintainability / Astro Convention
- Location: `src/demos/GridExplorer/GridExplorer.jsx:28-39`, `src/demos/GridExplorer/GridExplorer.jsx:50-104`, `src/demos/GridExplorer/gridExplorerClient.js:13-24`, `src/demos/GridExplorer/gridExplorerClient.js:75-117`
- Problem: `GridExplorer.jsx` uses React state and React `onChange` handlers, but the component is rendered through MDX without an Astro hydration directive. In production, the React handlers are not the runtime interaction model; `gridExplorerClient.js` attaches DOM listeners and mutates DOM/CSS/code panes.
- Why it matters: Tests that render `<GridExplorer />` exercise a hydrated React interaction path that production pages do not use. Future maintainers may update the React behavior and miss the real client enhancer, or update the client enhancer and leave React tests asserting a different behavior.
- Recommended fix: Choose one boring model and document it. The smaller change is to make `GridExplorer.jsx` a deterministic server-rendered markup component with no React state or runtime handlers, then let `gridExplorerClient.js` own browser behavior. If true React islands are desired, hydrate the demo intentionally and move normal control behavior into React, keeping only pointer-measurement behavior in a small client helper.
- Refactor risk: Medium

### HPI-3: Grid Explorer enhancement and Prism load on every page

- Severity: Medium
- Type: Performance / Astro Convention
- Location: `src/layouts/BaseLayout.astro:19-21`, `src/lib/demoClientEntrypoint.js:1-10`, `src/demos/GridExplorer/gridExplorerClient.js:1`, `src/lib/liveCodeHighlighting.js:1-3`
- Problem: `BaseLayout` imports the global demo client entrypoint for every page. That entrypoint imports Grid Explorer enhancement, which imports live code highlighting and Prism language modules, even on the course index and modules without Grid Explorer.
- Why it matters: This keeps the MVP working, but it couples every page to the heaviest demo and makes each new demo likely to increase global client JavaScript.
- Recommended fix: Load demo enhancement only when a page can contain demos. A simple option is a `loadDemoClient` prop on `BaseLayout` used by notes, slides, and standalone demo pages. A better local improvement is to make `demoClientEntrypoint.js` dynamically import a demo setup only when its `data-*` root is present.
- Refactor risk: Low

### HPI-4: Recursive MDX discovery can produce routes that cannot import content

- Severity: Medium
- Type: Bug / Maintainability
- Location: `src/lib/contentDiscovery.js:32-43`, `src/lib/contentDiscovery.js:116-134`, `src/pages/[unit]/[module]/index.astro:30-55`, `src/pages/[unit]/[module]/slides/index.astro:23-45`
- Problem: `findMdxFiles()` recursively discovers `.mdx` files anywhere below a unit folder, but route imports assume each module is directly at `src/content/units/{unit}/{module}.mdx`. A nested `src/content/units/02-css-layout/examples/01-demo.mdx` would be discovered as `/02-css-layout/01-demo/`, then fail at route import time.
- Why it matters: The spec supports subfolders for images, and future authors may add nested MDX examples or drafts. The current mismatch is hard to diagnose because discovery succeeds first and rendering fails later.
- Recommended fix: For the MVP, scan only direct `.mdx` children of each unit folder. If nested modules are wanted later, change both route derivation and import-path construction together.
- Refactor risk: Low

### HPI-5: Notes TOC IDs depend on a custom slugger matching rendered MDX headings

- Severity: Medium
- Type: Bug / Data Handling
- Location: `src/lib/headingIds.js:1-39`, `src/components/mdx/createNotesMdxComponents.jsx:6-21`, `src/lib/moduleNotes.js:11-14`
- Problem: The TOC is built from parsed raw heading titles, while rendered `<h2>` IDs are generated from React children. This works for plain headings, but can drift for headings with inline markup, entities, explicit IDs, non-ASCII text, or MDX expressions.
- Why it matters: Broken TOC links are likely to appear only when authors write richer headings, and the failure mode is subtle.
- Recommended fix: Document "plain text `##` headings only" as the supported MVP contract, or add focused tests and normalization for inline code/emphasis/entities. Avoid a broad parser rewrite unless richer headings become a real authoring need.
- Refactor risk: Low to Medium

### HPI-6: Demo reference validation can fail on commented-out content and unsupported MDX shapes

- Severity: Medium
- Type: Bug / Data Handling
- Location: `src/lib/demoRegistry.js:58-88`, `src/lib/demoRegistry.js:94-123`
- Problem: `validateDemoReferences()` strips fenced code blocks but still scans HTML comments and MDX comments. A commented-out `<MissingDemo />` can fail the build. The regex also does not support member-style components such as `<Demo.Widget />`.
- Why it matters: The validator is intentionally simple, which is fine, but its false positives are surprising during authoring.
- Recommended fix: Strip MDX comments (`{/* ... */}`) and HTML comments before scanning. Document that registered demo tags must be simple PascalCase names such as `<GridExplorer />`.
- Refactor risk: Low

### HPI-7: Duplicated Grid Explorer code-generation logic

- Severity: Medium
- Type: Maintainability
- Location: `src/demos/GridExplorer/GridExplorer.jsx:5-18`, `src/demos/GridExplorer/GridExplorer.jsx:167-197`, `src/demos/GridExplorer/gridExplorerClient.js:3-7`, `src/demos/GridExplorer/gridExplorerClient.js:166-186`
- Problem: Column recipes, `formatRem()`, and `buildCssCode()` are duplicated between server-rendered markup and client enhancement.
- Why it matters: Any future change to generated CSS has to be made twice. Since the demo displays code as teaching material, code-generation drift is user-facing.
- Recommended fix: Extract only the shared pure data/functions into a small local module such as `src/demos/GridExplorer/gridExplorerModel.js`. Keep DOM behavior and React/server markup separate.
- Refactor risk: Low

### HPI-8: Slide count metadata is generated but not checked by the client

- Severity: Low
- Type: Bug / Maintainability
- Location: `src/pages/[unit]/[module]/slides/index.astro:58`, `src/lib/slideDeckController.js:96-105`
- Problem: The slide page emits `data-expected-slide-count`, but `setupSlideDeck()` never compares it to the number of DOM slide sections it creates.
- Why it matters: The implementation relies on parser-derived count and DOM-derived grouping staying aligned. If a future top-level MDX component renders an unexpected direct `h1` or `h2`, the deck can silently differ from parser validation.
- Recommended fix: Compare expected and actual counts in development, or throw a clear error during setup if they differ. A console warning would also be acceptable for the current MVP.
- Refactor risk: Low

### HPI-9: Stale scaffold components remain in the finished source tree

- Severity: Low
- Type: Maintainability
- Location: `src/components/ThemeSample.astro`, `src/components/ReactCounter.jsx`, `src/components/ReactCounter.test.jsx`
- Problem: Phase 1 proof-of-scaffold components are no longer used by app routes.
- Why it matters: They make the source tree noisier for future maintainers and AI agents trying to identify the actual component model.
- Recommended fix: Delete the unused scaffold components and their test, or move them to documentation if they still have teaching value.
- Refactor risk: Low

## Localized Kludges and Structural Complexity

### SC-1: Grid Explorer has a split runtime model

- Related issue: HPI-2
- Recommendation: Clean up locally.
- Notes: This is the clearest phase-by-phase compromise. React made testing and initial markup easy, then a client module became the real runtime. Consolidate the mental model, not the whole demo system.

### SC-2: Grid Explorer duplicates generated-code helpers

- Related issue: HPI-7
- Recommendation: Consolidate with nearby logic.
- Notes: Extracting a small model module is justified because it removes real duplication in user-facing generated code.

### SC-3: Demo enhancement is globally loaded

- Related issue: HPI-3
- Recommendation: Clean up locally.
- Notes: Keep `BaseLayout` simple, but avoid importing every demo enhancer globally as demos grow.

### SC-4: Content discovery is broader than routing supports

- Related issue: HPI-4
- Recommendation: Clean up locally.
- Notes: Match the documented one-file-per-module convention. Do not add nested routing support unless there is an actual course-content need.

### SC-5: Slide count metadata is unused

- Related issue: HPI-8
- Recommendation: Clean up locally.
- Notes: `data-expected-slide-count` should either be used or removed. Using it as a guard is better because it documents the parser/rendered-DOM contract.

### SC-6: Phase 1 scaffold components remain

- Related issue: HPI-9
- Recommendation: Clean up locally.
- Notes: They are not harmful, but they are finished-MVP clutter.

### SC-7: Minor CSS oddities are not worth standalone churn

- Related issue: None
- Recommendation: Leave alone.
- Notes: Constant `clamp()` values in `src/styles/global.css:114-116` and `src/styles/global.css:391-393` are slightly odd but harmless. Clean them only when already touching typography.

## Bugs and Edge Cases

### BE-1: Nested MDX files are discovered but not renderable

- Related issue: HPI-4
- Notes: Nested `.mdx` files under a unit are discovered but cannot be rendered by the current route import path.

### BE-2: Commented-out MDX component tags can fail validation

- Related issue: HPI-6
- Notes: Commented-out uppercase MDX component tags can fail demo validation.

### BE-3: Rich section headings can break TOC links

- Related issue: HPI-5
- Notes: TOC links can drift from rendered IDs for non-plain `##` headings.

### BE-4: DOM slide grouping can silently diverge from parser count

- Related issue: HPI-8
- Notes: Slide grouping can silently differ from parser slide count if rendered direct children under `[data-slide-source]` include unexpected top-level `h1` or `h2` elements.

### BE-5: SemanticStructureDemo pollutes document landmarks

- Related issue: HPI-1
- Notes: `SemanticStructureDemo` creates extra real landmarks and an extra `<main>` inside pages.

### BE-6: Grid Explorer tests exercise a non-production interaction path

- Related issue: HPI-2
- Notes: Grid Explorer React component tests exercise an interaction path that production does not use unless the component becomes hydrated.

### BE-7: No-JavaScript slide skip target is not focusable

- Related issue: None
- Notes: The slide skip target is focusable after JavaScript replaces the source element, but the static no-JavaScript slide source does not have `tabindex="-1"` in markup at `src/pages/[unit]/[module]/slides/index.astro:59`.

### BE-8: SemanticStructureDemo has a redundant accessible name

- Related issue: HPI-1
- Notes: `SemanticStructureDemo` has a redundant accessible name, `Semantic Structure Demo demo`, at `src/demos/SemanticStructureDemo/SemanticStructureDemo.jsx:8`.

## Astro-Specific Recommendations

### AST-1: Keep the explicit demo registry

- Related issue: None
- Notes: It is simple and reviewable for this project size.

### AST-2: Do not migrate to Astro content collections just for convention purity

- Related issue: HPI-4
- Notes: The current plain discovery utilities are acceptable. The needed fix is to align discovery depth with route imports.

### AST-3: Avoid global demo-specific client JavaScript from `BaseLayout`

- Related issue: HPI-3
- Notes: Prefer conditional loading or dynamic imports keyed off visible `data-*` roots.

### AST-4: Decide whether demos are hydrated React islands or static React markup with progressive enhancement

- Related issue: HPI-2
- Notes: Both can be valid in Astro, but the current hybrid is confusing.

### AST-5: Keep rendering notes through Astro's normal MDX pipeline

- Related issue: None
- Notes: That preserves relative images and Shiki code highlighting with low complexity.

### AST-6: Keep the slide DOM-grouping approach for now

- Related issue: HPI-8
- Notes: It is a pragmatic tradeoff that preserves Astro MDX behavior. Add a count guard and document the constraint rather than recompiling MDX segments.

### AST-7: Leave route prop/type duplication alone for now

- Related issue: None
- Notes: Consider moving repeated route prop/type shapes into a tiny shared JSDoc/type file only if they start changing. Current duplication in the two dynamic routes is tolerable.

## Documentation Updates Needed

### DOC-1: README Current Status is stale

- Document: `README.md`
- Section or topic: Current Status
- Related issues: None
- What is stale/missing: It says the repository contains the MVP foundation, but the MVP is implemented through deployment.
- What should change: Say the repository contains the completed static MVP with course index, notes, slides, demo registry, Grid Explorer, standalone demo pages, and GitHub Pages deployment.

### DOC-2: README lacks final authoring constraints

- Document: `README.md`
- Section or topic: Authoring Model / Core Components
- Related issues: HPI-4, HPI-5, HPI-6
- What is stale/missing: It does not document the implemented constraints around registered demo components, uppercase MDX validation, plain text heading assumptions, or no frontmatter/import authoring.
- What should change: Add a short "Authoring constraints" section covering registered PascalCase demos, direct unit-level module files, plain `#`/`##` headings, local images, and the explicit demo registry.

### DOC-3: Implementation plan filename is easy to confuse

- Document: `README.md`
- Section or topic: Project Direction
- Related issues: None
- What is stale/missing: The file references `IMPLEMENTATION_PLANS.md`, while the user-facing requested path was `IMPLEMENTATION_PLAN.md`. The plural filename exists, but the singular/plural mismatch is easy to repeat.
- What should change: Standardize on one filename. Prefer renaming to `IMPLEMENTATION_PLAN.md` or explicitly call out the actual plural filename.

### DOC-4: SPEC still lists resolved implementation questions as open

- Document: `docs/implementation/SPEC.md`
- Section or topic: Demos / Open Implementation Questions
- Related issues: HPI-2, HPI-3, HPI-8
- What is stale/missing: The spec still frames demo mapping, slide route implementation, sticky TOC, theme tokens, and React-vs-Preact as open questions at `docs/implementation/SPEC.md:444-453`.
- What should change: Add a "Final MVP implementation decisions" section: explicit registry, Astro MDX whole-document rendering, client slide grouping, custom TOC, fixed light theme tokens, React retained, and manual slide overflow discipline.

### DOC-5: SPEC scanning language does not match supported routing

- Document: `docs/implementation/SPEC.md`
- Section or topic: Course Index
- Related issues: HPI-4
- What is stale/missing: It says scan `src/content/units/**/**/*.mdx` at `docs/implementation/SPEC.md:340`, but the route implementation only supports direct module files.
- What should change: Clarify direct module files under each unit folder, with subfolders reserved for assets unless nested routing is intentionally added.

### DOC-6: Implementation plan still contains resolved open decisions

- Document: `docs/implementation/IMPLEMENTATION_PLANS.md`
- Section or topic: Open Decisions To Resolve During Implementation
- Related issues: DOC-4
- What is stale/missing: Open decisions at `docs/implementation/IMPLEMENTATION_PLANS.md:451-458` have been resolved by Phases 6-11.
- What should change: Replace with a resolved-decision summary or link to the relevant phase files.

### DOC-7: Phase 5 closeout status is stale

- Document: `docs/implementation/PHASE-05.md`
- Section or topic: Phase Closeout Status
- Related issues: None
- What is stale/missing: It still says plan marking and commit are pending user verification.
- What should change: Update if the phase was actually closed, or leave a note explaining why Phase 5 differs from later closeouts.

### DOC-8: Demo agent guide references a non-existent slide file

- Document: `docs/DEMO_AGENT_GUIDE.md`
- Section or topic: Accessibility Expectations
- Related issues: HPI-8
- What is stale/missing: It references `src/lib/slideNavigation.js`, which does not exist, at `docs/DEMO_AGENT_GUIDE.md:188`.
- What should change: Replace with `src/lib/slideDeckController.js`.

### DOC-9: Demo agent guide describes the current demo runtime unclearly

- Document: `docs/DEMO_AGENT_GUIDE.md`
- Section or topic: Component Pattern / Client Enhancement Pattern
- Related issues: HPI-2
- What is stale/missing: It recommends React state for demo values, but the current production runtime is not hydrated React.
- What should change: Clarify the chosen model after resolving the Grid Explorer interaction split.

## Recommended Refactoring and Repair Plan

### Phase A: Safe bug fixes

- Fix HPI-1 / BE-5 / BE-8: hide or neutralize `SemanticStructureDemo` visual landmark markup and clean up its accessible name.
- Fix HPI-4 / BE-1 / SC-4: restrict content discovery to direct `.mdx` children of unit folders, or make nested routes/imports fully consistent.
- Fix HPI-6 / BE-2: strip HTML and MDX comments before demo reference validation.
- Fix HPI-8 / BE-4 / SC-5: use `data-expected-slide-count` as a guard in `setupSlideDeck()`.
- Fix BE-7: add `tabindex="-1"` to the static slide source element for no-JavaScript skip-link focus.

### Phase B: Documentation alignment

- Address DOC-1 / DOC-2 / DOC-3: update README status, authoring constraints, and implementation-plan filename guidance.
- Address DOC-4 / DOC-5: add final implementation decisions to the SPEC and align content scanning language with supported routing.
- Address DOC-6 / DOC-7: update `IMPLEMENTATION_PLANS.md` open decisions and stale Phase 5 closeout notes.
- Address DOC-8 / DOC-9: fix `docs/DEMO_AGENT_GUIDE.md` references and demo-runtime guidance.

### Phase C: Maintainability cleanup

- Address HPI-2 / SC-1 / BE-6 / AST-4: decide the Grid Explorer runtime model and remove the misleading half of the current split.
- Address HPI-7 / SC-2: extract shared Grid Explorer pure helpers/data into a local model module.
- Address HPI-3 / SC-3 / AST-3: conditionally load demo client JavaScript instead of importing Grid Explorer enhancement from every page.
- Address HPI-9 / SC-6: remove unused Phase 1 scaffold components and tests.

### Phase D: Optional future improvements

- Revisit HPI-5 / BE-3 only if authors need inline markup in `##` headings.
- Add a small authoring validation command if content grows beyond sample modules.
- Consider copy buttons for live code panes if instructors request them.
- Consider slide overflow tooling only after real lecture content shows a recurring need.

## Phase Execution Protocol

Each refactoring and repair phase is intended to be carried out by an agent in a fresh new conversation. The agent should begin by reading `README.md`, `docs/implementation/SPEC.md` and this document.

At the end of each phase, the agent must ask the user to verify that the phase is successfully complete. If the user agrees that the phase is complete, the agent must preserve important implementation context in a phase-specific markdown file, using this naming pattern:

```text
docs\refactoring\PHASE-A.md
docs\refactoring\PHASE-B.md
docs\refactoring\PHASE-C.md
```

The phase context file should capture the decisions made, files changed, commands run, tests or checks performed, and known limitations.

The final act for an approved phase is to mark the phase (Implemented) in these plans, and add/commit the phase changes to git. The commit should include the refactoring/repair work and the phase context file.

## Do Not Change

- Do not replace the explicit demo registry with auto-discovery right now. Related ID: AST-1. The registry is readable and low-risk for the current scale.
- Do not migrate to Astro content collections unless course content grows enough to justify it. Related ID: AST-2.
- Do not rewrite notes rendering away from Astro's normal MDX pipeline. Related ID: AST-5. It currently preserves relative images and Shiki code highlighting with low complexity.
- Do not rewrite slide rendering to compile individual MDX segments unless the DOM-grouping approach starts causing real bugs. Related ID: AST-6.
- Do not consolidate repeated route prop/type shapes yet. Related ID: AST-7. Current duplication is tolerable and easier to read than a premature shared type layer.
- Do not clean up minor CSS oddities as a standalone task. Related ID: SC-7. Address them only when already touching typography.
- Do not add slide fragments, PDF generation, search, or CodePen support as part of cleanup.
- Do not add broad abstraction around demos. Fix Grid Explorer's local split first, then let the next real demo reveal whether any shared pattern is needed.
- Do not make frontmatter required for modules. The file/folder convention remains a good fit for the MVP.
