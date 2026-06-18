import { setHighlightedCode } from "../../lib/liveCodeHighlighting.js";
import { buildHeadingScaleCss, getHeadingScale } from "./headingScaleModel.js";

export function setupHeadingScaleDemos(root = document) {
  root.querySelectorAll("[data-heading-scale-demo]").forEach((demo) => {
    if (demo.dataset.headingScaleReady === "true") {
      return;
    }

    demo.dataset.headingScaleReady = "true";
    demo.addEventListener("input", () => updateDemo(demo));
    demo.addEventListener("change", () => updateDemo(demo));
    updateDemo(demo);
  });
}

function updateDemo(demo) {
  const control = demo.querySelector('[data-heading-scale-control="scale"]');

  if (!control) {
    return;
  }

  const scaleName = control.value;
  const scale = getHeadingScale(scaleName);

  Object.entries(scale.sizes).forEach(([level, size]) => {
    const heading = demo.querySelector(`[data-heading-scale-level="${level}"]`);

    if (heading) {
      heading.style.setProperty("--heading-scale-size", size);
    }
  });

  const cssCode = demo.querySelector('[data-heading-scale-code="css"]');

  if (cssCode) {
    setHighlightedCode(cssCode, buildHeadingScaleCss(scaleName), "css");
  }
}
