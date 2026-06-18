import { setHighlightedCode } from "../../lib/liveCodeHighlighting.js";
import { buildLineHeightCss, getLineHeightValue } from "./lineHeightModel.js";

export function setupLineHeightDemos(root = document) {
  root.querySelectorAll("[data-line-height-demo]").forEach((demo) => {
    if (demo.dataset.lineHeightReady === "true") {
      return;
    }

    demo.dataset.lineHeightReady = "true";
    demo.addEventListener("input", () => updateDemo(demo));
    demo.addEventListener("change", () => updateDemo(demo));
    updateDemo(demo);
  });
}

function updateDemo(demo) {
  const selectedControl = demo.querySelector('[data-line-height-control="mode"]:checked');
  const preview = demo.querySelector("[data-line-height-preview]");

  if (!selectedControl || !preview) {
    return;
  }

  const mode = selectedControl.value;
  preview.style.setProperty("--line-height-demo-value", getLineHeightValue(mode));

  const cssCode = demo.querySelector('[data-line-height-code="css"]');

  if (cssCode) {
    setHighlightedCode(cssCode, buildLineHeightCss(mode), "css");
  }
}
