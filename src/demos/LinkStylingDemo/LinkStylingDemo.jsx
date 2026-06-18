import { useId } from "react";
import LiveCodeBlock from "../../components/LiveCodeBlock.jsx";
import "./LinkStylingDemo.css";
import {
  buildLinkStylingCss,
  decorationStyles,
  defaultLinkStylingState,
  formatEm,
} from "./linkStylingModel.js";

export default function LinkStylingDemo() {
  const idBase = useId();
  const state = defaultLinkStylingState;

  return (
    <section
      className="link-styling-demo"
      data-link-styling-demo
      data-link-styling-animate={state.animate ? "enabled" : "disabled"}
      role="group"
      aria-label="Link styling demo"
      style={buildPreviewStyle(state)}
    >
      <div className="link-styling-demo__workspace">
        <div className="link-styling-demo__controls" aria-label="Link styling controls">
          <div className="link-styling-demo__color-fields">
            <label className="link-styling-demo__field" htmlFor={`${idBase}-color`}>
              <span>Normal color</span>
              <input
                id={`${idBase}-color`}
                data-link-styling-control="color"
                type="color"
                defaultValue={state.color}
              />
            </label>

            <label className="link-styling-demo__field" htmlFor={`${idBase}-hover-color`}>
              <span>Hover color</span>
              <input
                id={`${idBase}-hover-color`}
                data-link-styling-control="hoverColor"
                type="color"
                defaultValue={state.hoverColor}
              />
            </label>
          </div>

          <label className="link-styling-demo__field" htmlFor={`${idBase}-decoration-style`}>
            <span>Decoration style</span>
            <select
              id={`${idBase}-decoration-style`}
              data-link-styling-control="decorationStyle"
              defaultValue={state.decorationStyle}
            >
              {decorationStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </label>

          <label className="link-styling-demo__field" htmlFor={`${idBase}-thickness`}>
            <span>
              Underline thickness:{" "}
              <output data-link-styling-output="underlineThickness">
                {formatEm(state.underlineThickness)}
              </output>
            </span>
            <input
              id={`${idBase}-thickness`}
              data-link-styling-control="underlineThickness"
              type="range"
              min="0.04"
              max="0.2"
              step="0.01"
              defaultValue={state.underlineThickness}
            />
          </label>

          <label className="link-styling-demo__field" htmlFor={`${idBase}-offset`}>
            <span>
              Underline offset:{" "}
              <output data-link-styling-output="underlineOffset">
                {formatEm(state.underlineOffset)}
              </output>
            </span>
            <input
              id={`${idBase}-offset`}
              data-link-styling-control="underlineOffset"
              type="range"
              min="0.08"
              max="0.36"
              step="0.01"
              defaultValue={state.underlineOffset}
            />
          </label>

          <label className="link-styling-demo__check" htmlFor={`${idBase}-animate`}>
            <input
              id={`${idBase}-animate`}
              data-link-styling-control="animate"
              type="checkbox"
              defaultChecked={state.animate}
            />
            <span>Animate hover changes</span>
          </label>

          <label className="link-styling-demo__check" htmlFor={`${idBase}-bold`}>
            <input
              id={`${idBase}-bold`}
              data-link-styling-control="bold"
              type="checkbox"
              defaultChecked={state.bold}
            />
            <span>Bold links</span>
          </label>
        </div>

        <div className="link-styling-demo__stage" role="group" aria-label="Link styling preview">
          <div className="link-styling-demo__sample">
            <div className="link-styling-demo__sample-group">
              <div className="link-styling-demo__sample-heading">Planning Links</div>
              <p>
                Check the <a href="/hours">visitor hours</a>, review{" "}
                <a href="/admission">admission details</a>, or save the{" "}
                <a href="/garden-map">garden map</a> before you arrive.
              </p>
            </div>
            <div className="link-styling-demo__sample-group">
              <div className="link-styling-demo__sample-heading">Context Link</div>
              <p>
                The indoor garden stays comfortable in every season, and the{" "}
                <a href="/accessibility">accessibility guide</a> explains route
                widths, seating areas, and quieter arrival times.
              </p>
            </div>
          </div>
          <p className="link-styling-demo__contrast-note">
            Check link and hover colours against WCAG contrast requirements.
          </p>
        </div>
      </div>

      <div className="link-styling-demo__code" aria-label="Generated code">
        <LiveCodeBlock
          label="CSS"
          language="css"
          code={buildLinkStylingCss(state)}
          copyLabel="Copy link styling CSS code"
          codeProps={{ "data-link-styling-code": "css" }}
        />
      </div>
    </section>
  );
}

function buildPreviewStyle(state) {
  return {
    "--link-demo-color": state.color,
    "--link-demo-hover-color": state.hoverColor,
    "--link-demo-decoration-style": state.decorationStyle,
    "--link-demo-thickness": formatEm(state.underlineThickness),
    "--link-demo-offset": formatEm(state.underlineOffset),
    "--link-demo-hover-offset": formatEm(state.underlineOffset + 0.04),
    "--link-demo-weight": state.bold ? "600" : "400",
  };
}
