import { useId } from "react";
import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./LineHeightDemo.css";
import {
  buildLineHeightCss,
  buildLineHeightHtml,
  defaultLineHeightState,
  getLineHeightValue,
  lineHeightOptions,
} from "./lineHeightModel.js";

export default function LineHeightDemo() {
  const idBase = useId();
  const { mode } = defaultLineHeightState;
  const lineHeight = getLineHeightValue(mode);

  return (
    <section
      className="line-height-demo"
      data-line-height-demo
      role="group"
      aria-label="Line height demo"
    >
      <div className="line-height-demo__workspace">
        <fieldset className="line-height-demo__controls">
          <legend>Line-height rule</legend>
          {Object.entries(lineHeightOptions).map(([option, definition]) => (
            <label key={option} className="line-height-demo__choice" htmlFor={`${idBase}-${option}`}>
              <input
                id={`${idBase}-${option}`}
                data-line-height-control="mode"
                name={`${idBase}-line-height`}
                type="radio"
                value={option}
                defaultChecked={option === mode}
              />
              <span>{definition.label}</span>
            </label>
          ))}
        </fieldset>

        <div className="line-height-demo__stage" role="group" aria-label="Line height preview">
          <article
            className="line-height-demo__sample"
            data-line-height-preview
            style={{ "--line-height-demo-value": lineHeight }}
          >
            <h1>Visit The Winter Garden</h1>
            <p>
              The indoor garden stays bright through the colder months, with wide paths,
              quiet seating, and clear signs for visitors.
            </p>
          </article>
        </div>
      </div>

      <div className="line-height-demo__code" aria-label="Generated code">
        <LiveCodeBlock
          label="HTML"
          language="html"
          code={buildLineHeightHtml()}
          copyLabel="Copy line height HTML code"
        />
        <LiveCodeBlock
          label="CSS"
          language="css"
          code={buildLineHeightCss(mode)}
          copyLabel="Copy line height CSS code"
          codeProps={{ "data-line-height-code": "css" }}
        />
      </div>
    </section>
  );
}
