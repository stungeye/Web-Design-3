import { buildBaseStylesheetPreviewDocument } from "./baseStylesheetModel.js";

export function setupBaseStylesheetDemos(root = document) {
  root.querySelectorAll("[data-base-stylesheet-demo]").forEach((demo) => {
    if (demo.dataset.baseStylesheetReady === "true") {
      return;
    }

    demo.dataset.baseStylesheetReady = "true";
    demo.addEventListener("input", () => updateDemo(demo));
    demo.addEventListener("change", () => updateDemo(demo));
    updateDemo(demo);
  });
}

function updateDemo(demo) {
  const control = demo.querySelector('[data-base-stylesheet-control="enabled"]');
  const enabled = Boolean(control?.checked);
  const preview = demo.querySelector("[data-base-stylesheet-preview]");

  demo.dataset.baseStyles = enabled ? "enabled" : "default";
  preview?.setAttribute("srcdoc", buildBaseStylesheetPreviewDocument({ enabled }));
}
