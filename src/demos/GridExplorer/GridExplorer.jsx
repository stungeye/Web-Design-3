import { useId, useState } from "react";
import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./GridExplorer.css";

const columnRecipes = {
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
};

const previewItems = [
  { className: "feature-card feature-card--lead", label: "Header" },
  { className: "feature-card", label: "Navigation" },
  { className: "feature-card", label: "Main content" },
  { className: "feature-card", label: "Related links" },
  { className: "feature-card", label: "Footer" },
];

export default function GridExplorer() {
  const idBase = useId();
  const [columnRecipe, setColumnRecipe] = useState("balanced");
  const [gap, setGap] = useState(16);
  const [alignItems, setAlignItems] = useState("stretch");
  const [leadSpans, setLeadSpans] = useState(true);

  const columns = columnRecipes[columnRecipe].value;
  const gapRem = formatRem(gap);
  const htmlCode = buildHtmlCode();
  const cssCode = buildCssCode({ alignItems, columns, gapRem, leadSpans });

  return (
    <section
      className="grid-explorer"
      data-grid-explorer
      role="group"
      aria-label="Grid Explorer demo"
    >
      <div className="grid-explorer__workspace" data-grid-workspace>
        <div className="grid-explorer__panel grid-explorer__panel--controls">
          <div className="grid-explorer__controls">
            <label className="grid-explorer__field" htmlFor={`${idBase}-columns`}>
              <span>Column recipe</span>
              <select
                id={`${idBase}-columns`}
                data-grid-control="columns"
                value={columnRecipe}
                onChange={(event) => setColumnRecipe(event.target.value)}
              >
                {Object.entries(columnRecipes).map(([recipe, definition]) => (
                  <option key={recipe} value={recipe}>
                    {definition.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid-explorer__field" htmlFor={`${idBase}-gap`}>
              <span>Gap</span>
              <span className="grid-explorer__value" data-grid-output="gap" aria-hidden="true">
                {gapRem}
              </span>
              <input
                id={`${idBase}-gap`}
                aria-label="Gap"
                data-grid-control="gap"
                type="range"
                min="0"
                max="32"
                step="4"
                value={gap}
                onChange={(event) => setGap(Number(event.target.value))}
              />
            </label>

            <label className="grid-explorer__field" htmlFor={`${idBase}-alignment`}>
              <span>Item alignment</span>
              <select
                id={`${idBase}-alignment`}
                data-grid-control="alignment"
                value={alignItems}
                onChange={(event) => setAlignItems(event.target.value)}
              >
                <option value="stretch">Stretch</option>
                <option value="start">Start</option>
                <option value="center">Center</option>
              </select>
            </label>

            <label className="grid-explorer__check" htmlFor={`${idBase}-lead`}>
              <input
                id={`${idBase}-lead`}
                data-grid-control="lead"
                type="checkbox"
                checked={leadSpans}
                onChange={(event) => setLeadSpans(event.target.checked)}
              />
              <span>Header spans all columns</span>
            </label>
          </div>
        </div>

        <div
          className="grid-explorer__resize-handle"
          data-grid-resize-handle
          role="separator"
          aria-label="Resize preview area"
          aria-orientation="vertical"
          aria-valuemin="192"
          aria-valuemax="900"
          aria-valuenow="612"
          aria-valuetext="Preview width about 612 pixels"
          tabIndex="0"
        >
          <span aria-hidden="true" />
        </div>

        <div className="grid-explorer__stage" role="group" aria-label="Grid preview">
          <div
            className="grid-explorer__preview"
            style={{
              "--grid-template-columns": columns,
              "--grid-gap": gapRem,
              "--grid-align-items": alignItems,
            }}
          >
            {previewItems.map((item) => (
              <article
                className={item.className}
                data-grid-card={item.label === "Header" ? "lead" : undefined}
                data-lead-spans={item.label === "Header" && leadSpans ? "true" : undefined}
                key={item.label}
              >
                {item.label}
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-explorer__panel grid-explorer__panel--code" aria-label="Generated code">
        <LiveCodeBlock
          label="HTML"
          language="html"
          code={htmlCode}
          codeProps={{ "data-grid-code": "html" }}
        />
        <LiveCodeBlock
          label="CSS"
          language="css"
          code={cssCode}
          codeProps={{ "data-grid-code": "css" }}
        />
      </div>
    </section>
  );
}

function formatRem(pxValue) {
  const remValue = pxValue / 16;
  return Number.isInteger(remValue) ? `${remValue}rem` : `${remValue.toFixed(2)}rem`;
}

function buildHtmlCode() {
  return `<section class="feature-grid">
  <article class="feature-card feature-card--lead">Header</article>
  <article class="feature-card">Navigation</article>
  <article class="feature-card">Main content</article>
  <article class="feature-card">Related links</article>
  <article class="feature-card">Footer</article>
</section>`;
}

function buildCssCode({ alignItems, columns, gapRem, leadSpans }) {
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
