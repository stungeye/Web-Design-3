export const lineHeightOptions = Object.freeze({
  fixed: {
    label: "line-height: 1.5",
    value: "1.5",
  },
  calculated: {
    label: "line-height: calc(1em + 0.5rem)",
    value: "calc(1em + 0.5rem)",
  },
});

export const defaultLineHeightState = Object.freeze({
  mode: "fixed",
});

export function getLineHeightValue(mode) {
  return lineHeightOptions[mode]?.value ?? lineHeightOptions.fixed.value;
}

export function buildLineHeightCss(mode) {
  return `.reading-sample > * {
  line-height: ${getLineHeightValue(mode)};
}`;
}

export function buildLineHeightHtml() {
  return `<article class="reading-sample">
  <h1>Visit The Winter Garden</h1>
  <p>
    The indoor garden stays bright through the colder months, with wide
    paths, quiet seating, and clear signs for visitors.
  </p>
</article>`;
}
