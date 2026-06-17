# Sliders

Sliders is an experimental static teaching-notes and lecture-slide system.

The goal is to author one MDX file per course module and publish both:

- a polished, accessible, scrollable notes page for students
- a keyboard-navigable slide view for classroom delivery

The first target course is Web Design 3 at Red River College, with content focused on semantic HTML, accessibility, CSS Grid, Flexbox, and fluid layouts.

## Project Direction

The implementation is Astro + MDX + React demos:

- Astro for static site generation and GitHub Pages output
- MDX for Markdown authoring with embedded components
- React for interactive CSS teaching demos
- Syntax-highlighted Markdown code blocks
- Static hosting only, with no backend

See [SPEC.md](./docs/implementation/SPEC.md) for the full implementation specification and the decisions captured from the initial design discussion.

See [IMPLEMENTATION_PLANS.md](./docs/implementation/IMPLEMENTATION_PLANS.md) for the full implementation plan based on the spec.

## Implementation Philosophy

Prefer documented conventions over configuration, the smallest design that fully satisfies each feature, explicit readable code, local reasoning, and safe seams for future change.

Use red/green TDD where practical, especially for parsing, routing, component resolution, and rendering behavior. Prefer names that explain intent, functions with one clear job, straightforward control flow, traceable state transitions, and tests that describe behavior.

When choosing between two correct implementations, prefer the one that is easier to review and safer to modify. Avoid speculative abstractions, local kludges for discovered issues, over-fragmented vague helpers, and premature generalization beyond the one-course MVP.

## Authoring Model

Each module is one direct `.mdx` file inside a unit folder. Heading levels define the slide and notes structure:

- `#` is the module title and title slide.
- `##` starts a new slide and a new major notes section.
- `###` and deeper headings stay inside the current slide/section.
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

<Note>Grid layout applies to the direct children of the grid container.</Note>

<Aside>This longer explanation appears in the notes view only.</Aside>

## Template Areas

<GridExplorer />

<Warning>Named grid areas must form rectangles.</Warning>
````

### Authoring Constraints

The current MVP keeps authoring convention-based:

- Module files live directly under `src/content/units/{unit}/`; nested `.mdx` files are ignored unless nested routing is added later.
- Subfolders under a unit are reserved for local assets such as images.
- Modules do not require frontmatter or local MDX imports.
- Use one plain text `#` module title and plain text `##` section headings. Rich inline markup in headings is not part of the supported MVP authoring contract.
- Demo components must be registered in `src/lib/demoRegistry.js` and referenced with simple PascalCase tags such as `<GridExplorer />`.
- Unknown uppercase MDX component tags fail validation unless they are known teaching primitives or registered demos.

Run the authoring check before publishing content changes:

```text
npm run validate:authoring
```

It validates module heading structure, registered MDX demo references, direct
module file placement, and the plain text `#`/`##` heading convention.

## Core Components

Sliders modules use MDX components for teaching primitives:

- `<Note>` renders `Note:` (For adding important information you don't want learners to miss.)
- `<Warning>` renders `Warning:` (Warnings to prepare learners for common bugs and “gotchas”.)
- `<Question>` renders `Question To Learn:` (Questions for learners to actively investigate or answer.)
- `<Practice>` renders `Best Practice:` (For highlighting industry best practices.)
- `<Wait>` renders `Wait For It:` (Indications that more details will be provided later in the notes or in future modules.)
- `<Aside>` renders only in notes view, not slide view. Use it sparingly for student-facing extra explanation, examples, context, or nuance that is genuinely supplemental. Do not hide lecture-critical content in an aside just to shorten a slide; create another `##` slide or use a visible callout instead. Do not use it for instructor-only notes, author reminders, or behind-the-scenes teaching prompts. Substantial asides should usually start with a plain `###` heading so notes readers can scan the added detail.
- Keep callout density low. Most slides should have zero or one callout; multiple callouts on one slide should be rare and intentional.
- Demo components such as `<GridExplorer />` embed interactive teaching tools

Current demos render deterministic initial markup through Astro/MDX and attach
any browser behavior through registered client enhancement code. Demo client code
is loaded only on demo-capable routes and each enhancer is imported only when
its matching demo root exists.

## Source Layout

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
      gridExplorerModel.js
      gridExplorerClient.js
```

Unit and module ordering should come from numeric folder/file prefixes. Display titles should come from each module's `# H1`.

## URLs

Each module has paired notes and slides views:

```text
/02-css-layout/01-grid/
/02-css-layout/01-grid/slides/
```

Numeric prefixes stay in URLs but do not need to appear in visible titles.

## Deployment

The site is static and does not require a backend or runtime server. Production
builds are configured for GitHub Pages at:

```text
https://stungeye.github.io/Sliders/
```

The Astro deployment base path is `/Sliders`, matching the GitHub repository
name. If the repository is renamed or moved to a custom domain, update `site`
and `base` in `astro.config.mjs` before deploying.

### Forking for a Course

When forking this project for a specific course, clone the fork and update the
deployment target before publishing:

1. Edit `astro.config.mjs`.
2. Set `site` to your GitHub Pages host, such as
   `https://YOUR_GITHUB_USERNAME.github.io`.
3. Set `base` to the forked repository name, such as `/web-design-3-slides`.
   The `base` value must match the repository name unless the site uses a
   custom domain.
4. Edit `src/lib/siteMetadata.js` to set the course label, site title, and
   index page description for the course.
5. In the forked repository on GitHub, go to Settings > Pages > Build and
   deployment > Source and choose GitHub Actions.
6. Run the local checks before pushing course-specific content:

```text
npm install
npm run validate:authoring
npm test
npm run build
```

After the first push to `main`, confirm the Actions tab shows a successful
deployment and visit the fork's Pages URL:

```text
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/
```

If the repository is renamed later, update `base` in `astro.config.mjs` again.

GitHub Pages deployment is handled by `.github/workflows/deploy.yml` on pushes
to `main`, plus manual runs from the Actions tab. In the repository web UI,
Settings > Pages > Build and deployment > Source must be set to `GitHub Actions`.

## Current Status

This repository contains the completed static MVP described in
[SPEC.md](./docs/implementation/SPEC.md): course index, notes pages, slide
views, explicit demo registry, Grid Explorer, standalone demo pages, static
build, and GitHub Pages deployment.
