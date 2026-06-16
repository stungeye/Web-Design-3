# Repository Guidelines

## Primary Agent Focus

The main agent task is adding Web Design 3 modules and interactive demos. Treat the Sliders platform present in this repo as established infrastructure unless course work exposes a framework bug.

Use `docs/COURSE_PLAN.md` as the source of truth.

Read `README.md` for MDX authoring rules. Read `docs/DEMO_AGENT_GUIDE.md` before adding or changing the iteractive demo that can be added to course modules.

## Project Structure & Module Organization

- `src/content/units/{unit}/{module}.mdx` contains course modules. Numeric prefixes control order, such as `02-css-layout/01-grid.mdx`.
- `src/pages/` defines notes, slide, demo, and index routes.
- `src/lib/` contains parsing, routing, metadata, validation, and behavior.
- `src/demos/{DemoName}/` contains interactive React demos, CSS, model/client code, and tests.
- `docs/COURSE_PLAN.md` defines the course sequence and scope.
- `docs/DEMO_AGENT_GUIDE.md` documents demo architecture and authoring expectations.

## Build, Test, and Development Commands

- `npm run dev` starts the local Astro development server.
- `npm run build` runs `astro check` and builds `dist/`.
- `npm test` runs the Vitest suite once.
- `npm run test:watch` runs Vitest in watch mode.
- `npm run validate:authoring` checks MDX module placement, heading structure, and registered demo usage.

Run `validate:authoring`, `test`, and `build` before publishing modules, demos, or routing changes.

## Coding Style & Naming Conventions

Use ES modules, React JSX, Astro conventions, small explicit functions, and two-space indentation.

Use PascalCase for React components and demo folders, for example `GridExplorer`. Use camelCase for JavaScript helpers, for example `moduleParser.js`. Demo tags must be registered in `src/lib/demoRegistry.js`.

## Testing Guidelines

Tests use Vitest with Testing Library and jsdom. Place tests beside covered code as `*.test.js` or `*.test.jsx`.

Add tests for parser behavior, routing, authoring validation, MDX rendering, and demo logic. Demo tests should cover deterministic initial markup and pure model/client behavior.

## Commit Guidelines

Use short, sentence-style summaries. Keep commits focused. The user will push because a passphrase is required.

## Content & Demo Authoring

For content, follow `README.md`: one direct `.mdx` module file per unit folder, plain text `#` and `##` headings, local assets in unit subfolders, and registered demos only. Align topics and skill depth with `docs/COURSE_PLAN.md`.

For demos, follow `docs/DEMO_AGENT_GUIDE.md`. Use `GridExplorer` as the reference pattern, register demos in `src/lib/demoRegistry.js`, add metadata in `src/lib/demoMetadata.js`, and keep initial markup useful.

Avoid broad platform refactors unless they directly support the requested Web Design 3 module or demo.
