export const defaultGridExplorerState = Object.freeze({
  alignItems: "stretch",
  columnRecipe: "balanced",
  gap: 16,
  leadSpans: true,
});

export const columnRecipes = Object.freeze({
  balanced: {
    label: "Three equal columns",
    value: "repeat(3, minmax(0, 1fr))",
  },
  sidebar: {
    label: "Sidebar and fluid content",
    value: "minmax(12rem, 18rem) minmax(0, 1fr)",
  },
  cards: {
    label: "Responsive card tracks",
    value: "repeat(auto-fit, minmax(10rem, 1fr))",
  },
});

export const alignmentOptions = Object.freeze([
  { label: "Stretch", value: "stretch" },
  { label: "Start", value: "start" },
  { label: "Center", value: "center" },
]);

export const previewItems = Object.freeze([
  { className: "feature-card feature-card--lead", label: "Header", lead: true },
  { className: "feature-card", label: "Navigation" },
  { className: "feature-card", label: "Main content" },
  { className: "feature-card", label: "Related links" },
  { className: "feature-card", label: "Footer" },
]);

export function getColumnRecipeValue(recipeName) {
  return (
    columnRecipes[recipeName]?.value ??
    columnRecipes[defaultGridExplorerState.columnRecipe].value
  );
}

export function formatRem(pxValue) {
  const remValue = pxValue / 16;
  return Number.isInteger(remValue) ? `${remValue}rem` : `${remValue.toFixed(2)}rem`;
}

export function buildHtmlCode() {
  return `<section class="feature-grid">
  <article class="feature-card feature-card--lead">Header</article>
  <article class="feature-card">Navigation</article>
  <article class="feature-card">Main content</article>
  <article class="feature-card">Related links</article>
  <article class="feature-card">Footer</article>
</section>`;
}

export function buildCssCode({ alignItems, columns, gapRem, leadSpans }) {
  const leadRule = leadSpans
    ? `

.feature-card--lead {
  grid-column: 1 / -1;
}`
    : "";

  return `.feature-grid {
  display: grid;
  grid-template-columns: ${columns};
  gap: ${gapRem};
  align-items: ${alignItems};
}${leadRule}`;
}
