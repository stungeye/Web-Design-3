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
      <label className="semantic-structure-demo__field" htmlFor={`${idBase}-mode`}>
        <span>Markup version</span>
        <select
          id={`${idBase}-mode`}
          data-semantic-control="mode"
          defaultValue={mode}
        >
          {Object.entries(semanticStructureModes).map(([modeName, definition]) => (
            <option key={modeName} value={modeName}>
              {definition.label}
            </option>
          ))}
        </select>
      </label>

      <LiveCodeBlock
        label="HTML"
        language="html"
        code={selectedMode.htmlCode}
        copyLabel="Copy Visit Gimli HTML code"
        codeProps={{ "data-semantic-code": "html" }}
      />
    </section>
  );
}
