import { useId } from "react";
import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./SemanticStructureDemo.css";
import {
  defaultSemanticStructureState,
  getSemanticStructureMode,
  semanticStructureModes,
} from "./semanticStructureModel.js";

export default function SemanticStructureDemo() {
  const idBase = useId();
  const { mode } = defaultSemanticStructureState;
  const selectedMode = getSemanticStructureMode(mode);

  return (
    <section
      className="semantic-structure-demo"
      data-semantic-structure-demo
      role="group"
      aria-label="Semantic structure demo"
    >
      <LiveCodeBlock
        label="HTML"
        language="html"
        code={selectedMode.htmlCode}
        copyLabel="Copy Visit Gimli HTML code"
        codeProps={{ "data-semantic-code": "html" }}
      />

      <fieldset className="semantic-structure-demo__fieldset">
        <legend>Markup version</legend>
        <div className="semantic-structure-demo__choices">
          {Object.entries(semanticStructureModes).map(([modeName, definition]) => (
            <label className="semantic-structure-demo__choice" key={modeName}>
              <input
                data-semantic-control="mode"
                defaultChecked={modeName === mode}
                name={`${idBase}-mode`}
                type="radio"
                value={modeName}
              />
              <span>{definition.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
