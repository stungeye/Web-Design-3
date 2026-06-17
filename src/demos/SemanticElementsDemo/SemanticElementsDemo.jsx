import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./SemanticElementsDemo.css";
import { semanticElementsHtml } from "./semanticElementsModel.js";

export default function SemanticElementsDemo() {
  return (
    <section
      className="semantic-elements-demo"
      data-semantic-elements-demo
      data-elements-style="light"
      role="group"
      aria-label="Visible semantic elements demo"
    >
      <label className="semantic-elements-demo__toggle">
        <input
          data-elements-control="light-styling"
          type="checkbox"
          defaultChecked
        />
        <span>Light styling</span>
      </label>

      <div className="semantic-elements-demo__examples visit-card">
        <details>
          <summary>Are pets allowed?</summary>
          <p>Leashed dogs are welcome on outdoor trails.</p>
        </details>

        <figure>
          <div className="semantic-elements-demo__image" role="img" aria-label="Boats docked in Gimli Harbour">
            Gimli Harbour
          </div>
          <figcaption>Gimli Harbour is a popular summer walking route.</figcaption>
        </figure>

        <p>
          The market opens{" "}
          <time dateTime="2026-07-18T09:00">Saturday at 9 a.m.</time>.
        </p>

        <dl>
          <dt>Admission</dt>
          <dd>Free</dd>
          <dt>Season</dt>
          <dd>May to September</dd>
        </dl>

        <blockquote>
          <p>The pier is one of the best places to watch the sunset.</p>
          <cite>Tourism Gimli Visitor Guide</cite>
        </blockquote>

        <address>
          Gimli Visitor Information Centre<br />
          10 Centre Street<br />
          <a href="mailto:info@example.ca">info@example.ca</a>
        </address>
      </div>

      <div className="semantic-elements-demo__code">
        <LiveCodeBlock
          label="HTML"
          language="html"
          code={semanticElementsHtml}
          copyLabel="Copy semantic elements HTML code"
        />
      </div>
    </section>
  );
}
