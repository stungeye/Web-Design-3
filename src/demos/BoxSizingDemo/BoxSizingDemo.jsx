import { useId } from "react";
import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./BoxSizingDemo.css";
import {
  buildBoxSizingCss,
  defaultBoxSizingState,
  formatPx,
  getContentWidth,
  getPaintedWidth,
} from "./boxSizingModel.js";

export default function BoxSizingDemo() {
  const idBase = useId();
  const { borderWidth, boxSizing, padding } = defaultBoxSizingState;
  const cssCode = buildBoxSizingCss({ borderWidth, boxSizing, padding });

  return (
    <section
      className="box-sizing-demo"
      data-box-sizing-demo
      role="group"
      aria-label="Box sizing demo"
    >
      <div className="box-sizing-demo__workspace">
        <div className="box-sizing-demo__panel box-sizing-demo__panel--controls">
          <label className="box-sizing-demo__field" htmlFor={`${idBase}-box-sizing`}>
            <span>Box sizing</span>
            <select
              id={`${idBase}-box-sizing`}
              data-box-sizing-control="mode"
              defaultValue={boxSizing}
            >
              <option value="content-box">content-box</option>
              <option value="border-box">border-box</option>
            </select>
          </label>

          <label className="box-sizing-demo__field" htmlFor={`${idBase}-border-width`}>
            <span>
              Border width
              <span className="box-sizing-demo__value" data-box-sizing-output="border-width" aria-hidden="true">
                {formatPx(borderWidth)}
              </span>
            </span>
            <input
              id={`${idBase}-border-width`}
              aria-label="Border width"
              data-box-sizing-control="border-width"
              type="range"
              min="0"
              max="16"
              step="2"
              defaultValue={borderWidth}
            />
          </label>

          <label className="box-sizing-demo__field" htmlFor={`${idBase}-padding`}>
            <span>
              Padding
              <span className="box-sizing-demo__value" data-box-sizing-output="padding" aria-hidden="true">
                {formatPx(padding)}
              </span>
            </span>
            <input
              id={`${idBase}-padding`}
              aria-label="Padding"
              data-box-sizing-control="padding"
              type="range"
              min="0"
              max="28"
              step="4"
              defaultValue={padding}
            />
          </label>
        </div>

        <div className="box-sizing-demo__stage" role="group" aria-label="Box model preview">
          <div className="box-sizing-demo__ruler" aria-hidden="true">
            <span>220px width</span>
          </div>
          <div
            className="box-sizing-demo__box"
            data-box-sizing-preview="box"
            style={{
              "--box-border-width": formatPx(borderWidth),
              "--box-sizing": boxSizing,
              "--box-padding": formatPx(padding),
            }}
          >
            <div className="box-sizing-demo__content">content</div>
          </div>
        </div>
      </div>

      <div className="box-sizing-demo__bottom">
        <div className="box-sizing-demo__code" aria-label="Generated code">
          <LiveCodeBlock
            label="CSS"
            language="css"
            code={cssCode}
            copyLabel="Copy box sizing CSS code"
            codeProps={{ "data-box-sizing-code": "css" }}
          />
        </div>

        <figure className="box-sizing-demo__readout" aria-label="Box width summary">
          <figcaption className="box-sizing-demo__readout-header">Widths</figcaption>
          <div className="box-sizing-demo__readout-body">
            Declared width: <strong>220px</strong>
            <br />
            Painted box width:{" "}
            <strong data-box-sizing-output="painted-width">
              {formatPx(getPaintedWidth({ borderWidth, boxSizing, padding }))}
            </strong>
            <br />
            Content area width:{" "}
            <strong data-box-sizing-output="content-width">
              {formatPx(getContentWidth({ borderWidth, boxSizing, padding }))}
            </strong>
          </div>
        </figure>
      </div>
    </section>
  );
}
