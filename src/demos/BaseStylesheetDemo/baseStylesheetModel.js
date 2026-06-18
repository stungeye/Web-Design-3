export const defaultBaseStylesheetState = Object.freeze({
  enabled: true,
});

export function buildBaseStylesheetCss() {
  return `*, *::before, *::after {
  box-sizing: border-box;
}

* {
  line-height: calc(1em + 0.5rem);
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  color: #1f2933;
  background-color: #fffdf8;
}

input, button, textarea, select {
  font: inherit;
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

main > * + * {
  margin-block-start: 4rem;
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
      <ul>
        <li>Wide paths through indoor and outdoor gardens</li>
        <li>Benches near the conservatory and pond</li>
        <li>Clear signs for washrooms and exits</li>
      </ul>
    </section>

    <section>
      <h2 id="tickets">Ticket Request</h2>
      <label>
        Visit date
        <input type="date" />
      </label>
      <button type="button">Check availability</button>
    </section>
  </article>
</main>`;
}
