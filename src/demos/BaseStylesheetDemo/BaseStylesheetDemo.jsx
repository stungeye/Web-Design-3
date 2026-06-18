import { useId } from "react";
import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./BaseStylesheetDemo.css";
import {
  buildBaseStylesheetCss,
  buildBaseStylesheetHtml,
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

        <div
          className="base-stylesheet-demo__stage"
          role="group"
          aria-label="Base stylesheet preview"
        >
          <main className="base-stylesheet-demo__sample" data-base-stylesheet-preview>
            <article>
              <h1>Prairie Garden Visit Guide</h1>
              <p>
                Plan a comfortable visit with accessible paths, seasonal displays, and quiet
                places to rest.
              </p>
              <p>
                <a href="#demo-ticket-request">Review admission details</a>
              </p>

              <section>
                <h2>What To Expect</h2>
                <p>
                  The garden mixes open walking routes with smaller rooms for herbs,
                  pollinator plants, and winter citrus.
                </p>
                <ul>
                  <li>Wide paths through indoor and outdoor gardens</li>
                  <li>Benches near the conservatory and pond</li>
                  <li>Clear signs for washrooms and exits</li>
                </ul>
              </section>

              <section>
                <h2>Featured Space</h2>
                <figure>
                  <div className="base-stylesheet-demo__image" role="img" aria-label="Glass garden roof above leafy plants" />
                  <figcaption>South-facing glass keeps the central garden bright.</figcaption>
                </figure>
              </section>

              <section id="demo-ticket-request">
                <h2>Ticket Request</h2>
                <form>
                  <label>
                    Visit date
                    <input type="date" />
                  </label>
                  <label>
                    Group size
                    <select defaultValue="2">
                      <option value="1">1 visitor</option>
                      <option value="2">2 visitors</option>
                      <option value="4">4 visitors</option>
                    </select>
                  </label>
                  <button type="button">Check availability</button>
                </form>
              </section>
            </article>
          </main>
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
