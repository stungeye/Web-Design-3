import { setHighlightedCode } from "../../lib/liveCodeHighlighting.js";
import {
  buildLinkStylingCss,
  defaultLinkStylingState,
  formatEm,
  normalizeLinkStylingState,
} from "./linkStylingModel.js";

export function setupLinkStylingDemos(root = document) {
  root.querySelectorAll("[data-link-styling-demo]").forEach((demo) => {
    if (demo.dataset.linkStylingReady === "true") {
      return;
    }

    demo.dataset.linkStylingReady = "true";
    demo.addEventListener("input", () => updateDemo(demo));
    demo.addEventListener("change", () => updateDemo(demo));
    updateDemo(demo);
  });
}

function updateDemo(demo) {
  const state = readState(demo);

  demo.style.setProperty("--link-demo-color", state.color);
  demo.style.setProperty("--link-demo-hover-color", state.hoverColor);
  demo.style.setProperty("--link-demo-decoration-style", state.decorationStyle);
  demo.style.setProperty("--link-demo-thickness", formatEm(state.underlineThickness));
  demo.style.setProperty("--link-demo-offset", formatEm(state.underlineOffset));
  demo.style.setProperty("--link-demo-hover-offset", formatEm(state.underlineOffset + 0.04));
  demo.style.setProperty("--link-demo-weight", state.bold ? "600" : "400");
  demo.dataset.linkStylingAnimate = state.animate ? "enabled" : "disabled";

  setOutput(demo, "underlineThickness", formatEm(state.underlineThickness));
  setOutput(demo, "underlineOffset", formatEm(state.underlineOffset));

  const cssCode = demo.querySelector('[data-link-styling-code="css"]');

  if (cssCode) {
    setHighlightedCode(cssCode, buildLinkStylingCss(state), "css");
  }
}

function readState(demo) {
  return normalizeLinkStylingState({
    color: getControlValue(demo, "color"),
    hoverColor: getControlValue(demo, "hoverColor"),
    decorationStyle: getControlValue(demo, "decorationStyle"),
    underlineThickness: getControlValue(demo, "underlineThickness"),
    underlineOffset: getControlValue(demo, "underlineOffset"),
    bold: getControlChecked(demo, "bold"),
    animate: getControlChecked(demo, "animate"),
  });
}

function getControlValue(demo, name) {
  return demo.querySelector(`[data-link-styling-control="${name}"]`)?.value
    ?? defaultLinkStylingState[name];
}

function getControlChecked(demo, name) {
  return demo.querySelector(`[data-link-styling-control="${name}"]`)?.checked
    ?? defaultLinkStylingState[name];
}

function setOutput(demo, name, value) {
  const output = demo.querySelector(`[data-link-styling-output="${name}"]`);

  if (output) {
    output.textContent = value;
  }
}
