import { useId } from "react";
import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./HeadingScaleDemo.css";
import {
  buildHeadingScaleCss,
  defaultHeadingScaleState,
  getHeadingLevels,
  getHeadingScaleSizes,
  headingScales,
  maxHeadingLevelCount,
  minHeadingLevelCount,
} from "./headingScaleModel.js";

export default function HeadingScaleDemo() {
  const idBase = useId();
  const { levelCount, scale } = defaultHeadingScaleState;
  const headingLevels = getHeadingLevels(levelCount);
  const headingSizes = getHeadingScaleSizes(scale, levelCount);

  return (
    <section
      className="heading-scale-demo"
      data-heading-scale-demo
      data-heading-scale-level-count={levelCount}
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
                style={{ "--heading-scale-size": headingSizes[level] }}
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
            code={buildHeadingScaleCss(scale, levelCount)}
            copyLabel="Copy heading scale CSS code"
            codeProps={{ "data-heading-scale-code": "css" }}
          />
        </div>

        <div className="heading-scale-demo__field">
          <label htmlFor={`${idBase}-scale`}>Heading scale</label>
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

          <span className="heading-scale-demo__level-buttons">
            <button
              type="button"
              data-heading-scale-action="remove-level"
              aria-label="Remove heading level"
              title="Remove heading level"
              disabled={levelCount <= minHeadingLevelCount}
            >
              -
            </button>
            <button
              type="button"
              data-heading-scale-action="add-level"
              aria-label="Add heading level"
              title="Add heading level"
              disabled={levelCount >= maxHeadingLevelCount}
            >
              +
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}
