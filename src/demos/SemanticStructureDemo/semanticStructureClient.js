import { setHighlightedCode } from "../../lib/liveCodeHighlighting.js";
import {
  defaultSemanticStructureState,
  getSemanticStructureMode,
} from "./semanticStructureModel.js";

export function setupSemanticStructureDemos(root = document) {
  root.querySelectorAll("[data-semantic-structure-demo]").forEach((demo) => {
    if (demo.dataset.semanticStructureReady === "true") {
      return;
    }

    demo.dataset.semanticStructureReady = "true";
    demo.addEventListener("input", () => updateDemo(demo));
    demo.addEventListener("change", () => updateDemo(demo));
    updateDemo(demo);
  });
}

function updateDemo(demo) {
  const modeControl = demo.querySelector('[data-semantic-control="mode"]');
  const htmlCode = demo.querySelector('[data-semantic-code="html"]');

  const modeName = getSelectedMode(demo, modeControl);
  const mode = getSemanticStructureMode(modeName);

  if (htmlCode) {
    setHighlightedCode(htmlCode, mode.htmlCode, "html");
  }
}

function getSelectedMode(demo, modeControl) {
  const selectedModeControl = demo.querySelector(
    '[data-semantic-control="mode"]:checked',
  );

  return selectedModeControl?.value ?? modeControl?.value ?? defaultSemanticStructureState.mode;
}
