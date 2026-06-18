import { useId } from "react";
import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./BaseStylesheetDemo.css";
import {
  buildBaseStylesheetCss,
  buildBaseStylesheetHtml,
  buildBaseStylesheetPreviewDocument,
  defaultBaseStylesheetState,
} from "./baseStylesheetModel.js";

export default function BaseStylesheetDemo() {
  const idBase = useId();
  const enabled = defaultBaseStylesheetState.enabled;

  return (
    <section
      className="base-stylesheet-demo"
      data-base-stylesheet-demo
      data-base-styles={enabled ? "enabled" : "default"}
      role="group"
      aria-label="Base stylesheet demo"
    >
      <div className="base-stylesheet-demo__workspace">
        <label className="base-stylesheet-demo__toggle" htmlFor={`${idBase}-enabled`}>
          <input
            id={`${idBase}-enabled`}
            data-base-stylesheet-control="enabled"
            type="checkbox"
            defaultChecked={enabled}
          />
          <span>Enable A Small Base Stylesheet</span>
        </label>

        <div className="base-stylesheet-demo__stage">
          <iframe
            className="base-stylesheet-demo__preview"
            data-base-stylesheet-preview
            title="Base stylesheet preview"
            srcDoc={buildBaseStylesheetPreviewDocument({ enabled })}
          />
        </div>
      </div>

      <div className="base-stylesheet-demo__code" aria-label="Generated code">
        <LiveCodeBlock
          label="HTML"
          language="html"
          code={buildBaseStylesheetHtml()}
          copyLabel="Copy base stylesheet HTML code"
        />
        <LiveCodeBlock
          label="CSS"
          language="css"
          code={buildBaseStylesheetCss()}
          copyLabel="Copy base stylesheet CSS code"
        />
      </div>
    </section>
  );
}
