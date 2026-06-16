import { useId } from "react";
import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./GridExplorer.css";
import {
  alignmentOptions,
  buildCssCode,
  buildHtmlCode,
  columnRecipes,
  defaultGridExplorerState,
  formatRem,
  getColumnRecipeValue,
  previewItems,
} from "./gridExplorerModel.js";

export default function GridExplorer() {
  const idBase = useId();
  const { alignItems, columnRecipe, gap, leadSpans } = defaultGridExplorerState;
  const columns = getColumnRecipeValue(columnRecipe);
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
                defaultValue={columnRecipe}
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
                defaultValue={gap}
              />
            </label>

            <label className="grid-explorer__field" htmlFor={`${idBase}-alignment`}>
              <span>Item alignment</span>
              <select
                id={`${idBase}-alignment`}
                data-grid-control="alignment"
                defaultValue={alignItems}
              >
                {alignmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid-explorer__check" htmlFor={`${idBase}-lead`}>
              <input
                id={`${idBase}-lead`}
                data-grid-control="lead"
                type="checkbox"
                defaultChecked={leadSpans}
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
                data-grid-card={item.lead ? "lead" : undefined}
                data-lead-spans={item.lead && leadSpans ? "true" : undefined}
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
          copyLabel="Copy generated HTML code"
          codeProps={{ "data-grid-code": "html" }}
        />
        <LiveCodeBlock
          label="CSS"
          language="css"
          code={cssCode}
          copyLabel="Copy generated CSS code"
          codeProps={{ "data-grid-code": "css" }}
        />
      </div>
    </section>
  );
}
