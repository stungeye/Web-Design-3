import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./SemanticElementsDemo.css";
import {
  defaultSemanticElementState,
  getSemanticElement,
  semanticElementExamples,
} from "./semanticElementsModel.js";

export default function SemanticElementsDemo() {
  const selectedIndex = defaultSemanticElementState.index;
  const selectedElement = getSemanticElement(selectedIndex);

  return (
    <section
      className="semantic-elements-demo"
      data-semantic-elements-demo
      data-elements-index={selectedIndex}
      data-elements-style="light"
      role="group"
      aria-label="Semantic elements carousel"
    >
      <div className="semantic-elements-demo__header">
        <p className="semantic-elements-demo__eyebrow">Semantic element</p>
        <h3 data-elements-title>{selectedElement.title}</h3>
        <p data-elements-summary>{selectedElement.summary}</p>
      </div>

      <label className="semantic-elements-demo__toggle">
        <input
          data-elements-control="light-styling"
          type="checkbox"
          defaultChecked
        />
        <span>Light styling</span>
      </label>

      <div className="semantic-elements-demo__controls" aria-label="Choose semantic element">
        <button
          type="button"
          data-elements-action="previous"
          aria-label="Previous semantic element"
        >
          Previous
        </button>
        <span data-elements-count>
          {selectedIndex + 1} of {semanticElementExamples.length}
        </span>
        <button
          type="button"
          data-elements-action="next"
          aria-label="Next semantic element"
        >
          Next
        </button>
      </div>

      <div className="semantic-elements-demo__output">
        <div
          className="semantic-elements-demo__preview"
          data-elements-preview
          dangerouslySetInnerHTML={{ __html: selectedElement.previewHtml }}
        />

        <div className="semantic-elements-demo__code">
          <LiveCodeBlock
            label="HTML"
            language="html"
            code={selectedElement.htmlCode}
            copyLabel="Copy semantic element HTML code"
            codeProps={{ "data-elements-code": "html" }}
          />
        </div>
      </div>
    </section>
  );
}
