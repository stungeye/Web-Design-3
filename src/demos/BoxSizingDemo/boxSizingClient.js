import { setHighlightedCode } from "../../lib/liveCodeHighlighting.js";
import {
  buildBoxSizingCss,
  formatPx,
  getContentWidth,
  getPaintedWidth,
} from "./boxSizingModel.js";

export function setupBoxSizingDemos(root = document) {
  root.querySelectorAll("[data-box-sizing-demo]").forEach((demo) => {
    if (demo.dataset.boxSizingReady === "true") {
      return;
    }

    demo.dataset.boxSizingReady = "true";
    demo.addEventListener("input", () => updateDemo(demo));
    demo.addEventListener("change", () => updateDemo(demo));
    updateDemo(demo);
  });
}

function updateDemo(demo) {
  const modeControl = demo.querySelector('[data-box-sizing-control="mode"]');
  const borderWidthControl = demo.querySelector('[data-box-sizing-control="border-width"]');
  const paddingControl = demo.querySelector('[data-box-sizing-control="padding"]');
  const box = demo.querySelector('[data-box-sizing-preview="box"]');

  if (!modeControl || !borderWidthControl || !paddingControl || !box) {
    return;
  }

  const state = {
    borderWidth: Number(borderWidthControl.value),
    boxSizing: modeControl.value,
    padding: Number(paddingControl.value),
  };

  box.style.setProperty("--box-border-width", formatPx(state.borderWidth));
  box.style.setProperty("--box-sizing", state.boxSizing);
  box.style.setProperty("--box-padding", formatPx(state.padding));
  setOutput(demo, "border-width", formatPx(state.borderWidth));
  setOutput(demo, "padding", formatPx(state.padding));
  setOutput(demo, "painted-width", formatPx(getPaintedWidth(state)));
  setOutput(demo, "content-width", formatPx(getContentWidth(state)));

  const cssCode = demo.querySelector('[data-box-sizing-code="css"]');

  if (cssCode) {
    setHighlightedCode(cssCode, buildBoxSizingCss(state), "css");
  }
}

function setOutput(demo, name, value) {
  const output = demo.querySelector(`[data-box-sizing-output="${name}"]`);

  if (output) {
    output.textContent = value;
  }
}
