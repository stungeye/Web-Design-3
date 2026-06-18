export const defaultBaseStylesheetState = Object.freeze({
  enabled: true,
});

export function buildBaseStylesheetPreviewDocument({
  enabled = defaultBaseStylesheetState.enabled,
} = {}) {
  const style = enabled ? `\n    <style>\n${indent(buildBaseStylesheetCss(), 6)}\n    </style>` : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />${style}
  </head>
  <body>
${indent(buildBaseStylesheetHtml(), 4)}
  </body>
</html>`;
}

export function buildBaseStylesheetCss() {
  return `*, *::before, *::after {
  box-sizing: border-box;
}

* {
  line-height: calc(1em + 0.5rem);
}

*:not(dialog) {
  margin: 0;
}

body {
  font-family: system-ui, sans-serif;
  color: #1f2933;
  background-color: #fffdf8;
}

h1 { font-size: 1.953rem; }
h2 { font-size: 1.563rem; }
h3 { font-size: 1.25rem; }
h4 { font-size: 1rem; }

img, picture, canvas, svg, video {
  display: block;
  max-width: 100%;
  height: auto;
}

a {
  color: #075985;
  text-underline-offset: 0.16em;
}

:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 0.2rem;
}

main {
  max-width: 70ch;
  margin-inline: auto;
  padding: 2rem;
}

main > * + *,
article > * + *,
section > * + * {
  margin-block-start: 1.25rem;
}`;
}

export function buildBaseStylesheetHtml() {
  return `<main>
  <article>
    <h1>Prairie Garden Visit Guide</h1>
    <p>
      Plan a comfortable visit with accessible paths, seasonal displays,
      and quiet places to rest.
    </p>
    <p>
      <a href="#tickets">Review admission details</a>
    </p>

    <section>
      <h2>What To Expect</h2>
      <p>
        The garden mixes open walking routes with smaller rooms for herbs,
        pollinator plants, and winter citrus.
      </p>
      <ul>
        <li>Wide paths through indoor and outdoor gardens</li>
        <li>Benches near the conservatory and pond</li>
        <li>Clear signs for washrooms and exits</li>
      </ul>
    </section>

    <section>
      <h2>Featured Space</h2>
      <figure>
        <svg role="img" aria-label="Glass garden roof above leafy plants" viewBox="0 0 640 240">
          <rect width="640" height="240" fill="#ecfdf5" />
          <path d="M0 180 C120 110 190 140 300 88 C430 28 520 80 640 24 V240 H0 Z" fill="#99f6e4" />
          <path d="M0 95 L640 10" stroke="#0f766e" stroke-width="8" opacity="0.35" />
          <path d="M120 240 L450 0" stroke="#2563eb" stroke-width="8" opacity="0.25" />
        </svg>
        <figcaption>South-facing glass keeps the central garden bright.</figcaption>
      </figure>
    </section>

    <section id="tickets">
      <h2>Admission Details</h2>
      <p>
        Tickets are timed so paths and indoor rooms stay comfortable throughout
        the day.
      </p>
      <p>
        Members can enter during the first hour before public admission begins.
      </p>
    </section>
  </article>
</main>`;
}

function indent(value, spaces) {
  const padding = " ".repeat(spaces);
  return value
    .split("\n")
    .map((line) => `${padding}${line}`)
    .join("\n");
}
