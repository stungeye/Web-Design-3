# Demo Agent Guide

This guide is for future agents adding interactive teaching demos like `GridExplorer`.
It reflects the demo architecture implemented through Phase 9 and refined in
refactoring Phase C in
`docs/implementation/IMPLEMENTATION_PLANS.md` and the current `GridExplorer`
implementation.

## Read First

Before adding or changing a demo, read these files:

- `src/lib/demoRegistry.js`
- `src/lib/demoClientEntrypoint.js`
- `src/demos/GridExplorer/GridExplorer.jsx`
- `src/demos/GridExplorer/gridExplorerModel.js`
- `src/demos/GridExplorer/gridExplorerClient.js`

`GridExplorer` is the reference implementation. Follow its conventions unless
the new demo has a concrete reason to differ.

## Project Context

Sliders is a static Astro, MDX, and React teaching-notes system. Instructors
author one `.mdx` file per module, and the site generates both a student-facing
notes page and a classroom-facing slide deck from that same source.

Interactive demos are first-class teaching content. The authoring contract is
deliberately simple: a module should be able to embed a registered demo with one
MDX tag, such as `<GridExplorer />`, without imports or frontmatter.

The important demo decisions already made are:

- React is the default component technology for demo markup.
- Demo registration is explicit in `src/lib/demoRegistry.js`.
- Unregistered uppercase MDX component references fail clearly at build time.
- Registered demos render in notes, slides, and standalone `/demos/.../` pages.
- Standalone demo pages use the same site shell and fixed light theme.
- Demo components embedded in MDX currently render as deterministic static markup
  unless a route intentionally hydrates them.
- Browser interaction for the current `GridExplorer` production path is attached
  by `src/lib/demoClientEntrypoint.js` and
  `src/demos/GridExplorer/gridExplorerClient.js`. The entrypoint is loaded only
  on demo-capable routes and dynamically imports an enhancer only when its
  `data-*` root exists.
- `GridExplorer` is the pattern for future full-featured demos, but it is not a
  framework.
- `GridExplorer` shares deterministic teaching data and generated-code helpers
  through a small local model module instead of duplicating that logic in the
  component and client enhancer.
- Demos should generally combine controls, visual output, and generated code
  panes.
- Controls and code usually belong on the left or before the visual output; the
  visual output usually belongs on the right on wide screens.
- Generated HTML/CSS should be visible by default unless a demo has a specific
  teaching reason to collapse it.
- Notes must remain accessible and useful; slides must remain readable and
  projector-friendly.
- No backend, runtime server, editable playground, shareable state URL, CodePen
  support, or slide fragments are part of the current demo model.

## Architecture

Demos are React components embedded directly in MDX:

```mdx
<GridExplorer />
```

The flow is intentionally explicit:

1. A module author writes an uppercase MDX component tag.
2. `validateDemoReferences()` checks that the component is either a known
   teaching primitive or a registered demo.
3. `src/lib/demoRegistry.js` maps demo names to React components and standalone
   routes.
4. Notes and slides render the same registered component.
5. `src/pages/demos/[demo]/index.astro` creates standalone demo test pages from
   the registry.
6. Demo-capable routes pass `loadDemoClient` to `BaseLayout`.
7. `src/lib/demoClientEntrypoint.js` attaches registered browser-only
   progressive enhancement after the page loads, dynamically importing only
   enhancers whose root elements are present.

Keep this explicit model. Do not introduce auto-discovery, a demo framework, or
a new registry system unless the user asks for that broader change.

## Files For A New Demo

Use one folder per demo:

```text
src/demos/NewDemo/
  NewDemo.jsx
  NewDemo.css
  NewDemo.test.jsx
  newDemoModel.js           optional, for shared pure data/code helpers
  newDemoClient.js          optional, only for browser-only behavior
  newDemoClient.test.js     optional, when a client module exists
```

Then update:

- `src/lib/demoMetadata.js`
  - add `{ name: "NewDemo", title: "New Demo" }`
- `src/lib/demoRegistry.js`
  - import the React component
  - connect the metadata entry to `component: NewDemo`
- `src/lib/demoClientEntrypoint.js`
  - add a selector and dynamic loader if the demo has browser-only behavior
- an MDX module under `src/content/units/...`
  - embed the demo as `<NewDemo />` where the lesson needs it

The standalone route will be `/demos/NewDemo/` automatically after registration.

## Component Pattern

The React component should render useful, deterministic initial markup by itself.
Do not make the first render depend on browser-only JavaScript.

Follow these conventions:

- Export one default React component from `NewDemo.jsx`.
- Import the demo stylesheet from the component.
- Wrap the demo in a semantic container with a clear class name, `role="group"`
  when useful, and an accessible label.
- Use labeled native controls: `label`, `select`, `input`, `button`, and
  checkboxes before custom widgets.
- Render deterministic initial values without depending on browser JavaScript.
- Use CSS custom properties for visual state that CSS should own.
- Use `LiveCodeBlock` for generated HTML, CSS, or JS panes instead of building
  one-off highlighted code markup.
- Pass `copyLabel` to `LiveCodeBlock` when a code pane should expose a copy
  button. The shared live-code client enhancer owns clipboard behavior.
- Use stable `data-*` attributes for client enhancement hooks.
- Keep generated code panes visible by default unless the demo has a strong
  teaching reason to collapse them.

For demos with generated code, mirror `GridExplorer`: build the code strings in
plain helper functions in a local model module, pass them to `LiveCodeBlock`,
and test the visible code output.

## Client Enhancement Pattern

Demo components embedded through module MDX are not automatically hydrated. For
the current MVP model, production interaction belongs in a client enhancement
module unless the route intentionally opts into a hydrated island.

Only create a client module when behavior needs browser APIs, when interaction
must run on MDX-rendered static markup, or when setup should be shared across
server-rendered instances after Astro page loads.

The setup function should look like this in spirit:

```js
export function setupNewDemo(root = document) {
  root.querySelectorAll("[data-new-demo]").forEach((demo) => {
    if (demo.dataset.newDemoReady === "true") {
      return;
    }

    demo.dataset.newDemoReady = "true";
    // Attach events and synchronize derived DOM state.
  });
}
```

Then add a selector and dynamic loader to `demoEnhancers` in
`src/lib/demoClientEntrypoint.js`.
The setup function must be idempotent because it runs on first load and on
`astro:page-load`.

For unhydrated MDX demos, do not rely on React event handlers for production
behavior. If a future demo is intentionally hydrated, keep normal control
behavior in React and reserve client helper modules for behavior that is awkward
or impossible to express safely in the hydrated component, such as pointer
resizing, DOM measurements, or re-highlighting already-rendered code.

## Layout And Styling

Demos must work in notes, slides, and standalone pages.

Use `GridExplorer.css` as the layout reference:

- Controls and generated code generally belong on the left or before the visual
  output.
- The visual result generally belongs on the right on wide screens.
- Layouts must stack cleanly on narrow screens.
- Sizing should be projector-friendly at common classroom widths.
- Use global theme tokens from `src/styles/global.css` where practical.
- Keep the fixed light theme.
- Avoid nested card structures and decorative layout chrome.
- Preserve readable code panes and controls in slides.
- Do not rely on color alone to communicate state.
- Include visible focus styles for all interactive controls.

If a demo needs a resizable region, copy the accessibility shape of
`GridExplorer`: a focusable `role="separator"` with ARIA value attributes and
keyboard resizing.

## Accessibility Expectations

Every demo should meet these minimums:

- The demo has an accessible name.
- Every control has an accessible label.
- Keyboard users can operate all controls.
- Focus states are visible.
- Generated code is real text, not an image.
- Motion and resizing do not block reading or keyboard navigation.
- The slide keyboard handler does not steal keys from focused demo controls.

When adding unusual keyboard behavior, check `src/lib/slideDeckController.js` so
demo controls and slide navigation do not conflict.

## Tests And Verification

Add focused tests for behavior that can be checked deterministically.

Typical test coverage:

- the demo renders its labeled controls, preview/output, and code panes
- client enhancement changes controls, preview state, and generated code when
  the demo is unhydrated
- hydrated React interaction works when a route intentionally hydrates the demo
- client setup is idempotent when a client module exists
- keyboard behavior works for custom controls such as separators

Run focused tests first, then the full checks:

```text
npm test -- src/demos/NewDemo/NewDemo.test.jsx
npm test -- src/demos/NewDemo/newDemoClient.test.js
npm test
npm run build
```

For visual/layout-sensitive demos, also run the dev server and verify:

```text
npm run dev
```

Check:

- `/demos/NewDemo/`
- the notes route containing `<NewDemo />`
- the matching `/slides/` route

Use browser or screenshot verification when the layout, resize behavior, or
projector framing is the risky part.

## Completion Checklist

Before handing off a new demo:

- The MDX authoring syntax is still just `<NewDemo />`.
- The demo is registered in `src/lib/demoRegistry.js`.
- Unknown demo names still fail clearly at build time.
- The standalone route renders.
- The demo works in notes and slides.
- Controls are keyboard accessible and labeled.
- Generated code panes remain readable.
- Focused tests pass.
- `npm test` and `npm run build` pass, or any inability to run them is clearly
  documented.
- Any important implementation decisions are recorded in the relevant phase or
  follow-up documentation.
- Ask user to manually test demo as the final acceptance test.

## Common Pitfalls

- Do not add a demo component without registering it; MDX references must fail
  clearly when unresolved.
- Do not rely on React event handlers for production behavior unless the route
  intentionally hydrates the demo.
- Do not put deterministic initial content only in a client script if the React
  component can render it directly.
- Do not make demo setup functions non-idempotent; Astro page-load events can run
  setup more than once.
- Do not hard-code production base paths. Use the existing site URL helpers and
  registry route paths.
- Do not over-generalize from one demo. Build the next clear demo, not a demo
  platform.
