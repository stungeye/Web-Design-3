# Sliders

Sliders is an experimental static teaching-notes and lecture-slide system.

The goal is to author one MDX file per course module and publish both:

- a polished, accessible, scrollable notes page for students
- a keyboard-navigable slide view for classroom delivery

The first target course is Web Design 3 at Red River College, with content focused on semantic HTML, accessibility, CSS Grid, Flexbox, and fluid layouts.

## Project Direction

The intended implementation is Astro + MDX + React demos:

- Astro for static site generation and GitHub Pages output
- MDX for Markdown authoring with embedded components
- React for interactive CSS teaching demos
- Syntax-highlighted Markdown code blocks
- Static hosting only, with no backend

See [SPEC.md](./SPEC.md) for the full implementation specification and the decisions captured from the initial design discussion.

## Implementation Philosophy

Prefer documented conventions over configuration, the smallest design that fully satisfies each feature, explicit readable code, local reasoning, and safe seams for future change.

Use red/green TDD where practical, especially for parsing, routing, component resolution, and rendering behavior. Prefer names that explain intent, functions with one clear job, straightforward control flow, traceable state transitions, and tests that describe behavior.

When choosing between two correct implementations, prefer the one that is easier to review and safer to modify. Avoid speculative abstractions, local kludges for discovered issues, over-fragmented vague helpers, and premature generalization beyond the one-course MVP.

## Authoring Model

Each module is one `.mdx` file. Heading levels define the slide and notes structure:

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

<Note>
Grid layout applies to the direct children of the grid container.
</Note>

<Aside>
This longer explanation appears in the notes view only.
</Aside>

## Template Areas

<GridExplorer />

<Warning>
Named grid areas must form rectangles.
</Warning>
````

## Core Components

Sliders modules use MDX components for teaching primitives:

- `<Note>` renders `Note:`
- `<Warning>` renders `Warning:`
- `<Practice>` renders `Best Practice:`
- `<Wait>` renders `Wait For It:`
- `<Aside>` renders only in notes view, not slide view
- Demo components such as `<GridExplorer />` embed interactive teaching tools

## Planned Source Layout

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
```

Unit and module ordering should come from numeric folder/file prefixes. Display titles should come from each module's `# H1`.

## Planned URLs

Each module should have paired notes and slides views:

```text
/02-css-layout/01-grid/
/02-css-layout/01-grid/slides/
```

Numeric prefixes stay in URLs but do not need to appear in visible titles.

## Current Status

This repository currently contains the project specification and overview only. The first implementation pass should scaffold the Astro project and build the MVP described in [SPEC.md](./SPEC.md).
