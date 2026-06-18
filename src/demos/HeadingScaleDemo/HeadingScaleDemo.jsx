import { useId } from "react";
import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./HeadingScaleDemo.css";
import {
  buildHeadingScaleCss,
  defaultHeadingScaleState,
  getHeadingScale,
  headingScales,
} from "./headingScaleModel.js";

const headingLevels = ["h1", "h2", "h3", "h4"];

export default function HeadingScaleDemo() {
  const idBase = useId();
  const { scale } = defaultHeadingScaleState;
  const selectedScale = getHeadingScale(scale);

  return (
    <section
      className="heading-scale-demo"
      data-heading-scale-demo
      role="group"
      aria-label="Heading scale demo"
    >
      <div className="heading-scale-demo__stage" role="group" aria-label="Heading scale preview">
        <div className="heading-scale-demo__sample" data-heading-scale-preview>
          {headingLevels.map((level) => {
            return (
              <div
                key={level}
                data-heading-scale-level={level}
                style={{ "--heading-scale-size": selectedScale.sizes[level] }}
              >
                {level.toUpperCase()} Example
              </div>
            );
          })}
        </div>
      </div>

      <div className="heading-scale-demo__bottom">
        <div className="heading-scale-demo__code" aria-label="Generated code">
          <LiveCodeBlock
            label="CSS"
            language="css"
            code={buildHeadingScaleCss(scale)}
            copyLabel="Copy heading scale CSS code"
            codeProps={{ "data-heading-scale-code": "css" }}
          />
        </div>

        <label className="heading-scale-demo__field" htmlFor={`${idBase}-scale`}>
          <span>Heading scale</span>
          <select
            id={`${idBase}-scale`}
            data-heading-scale-control="scale"
            defaultValue={scale}
          >
            {Object.entries(headingScales).map(([value, definition]) => (
              <option key={value} value={value}>
                {definition.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
