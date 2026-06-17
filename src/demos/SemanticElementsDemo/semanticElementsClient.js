export function setupSemanticElementsDemos(root = document) {
  root.querySelectorAll("[data-semantic-elements-demo]").forEach((demo) => {
    if (demo.dataset.semanticElementsReady === "true") {
      return;
    }

    demo.dataset.semanticElementsReady = "true";
    demo.addEventListener("input", () => updateDemo(demo));
    demo.addEventListener("change", () => updateDemo(demo));
    updateDemo(demo);
  });
}

function updateDemo(demo) {
  const stylingControl = demo.querySelector('[data-elements-control="light-styling"]');
  demo.dataset.elementsStyle = stylingControl?.checked ? "light" : "default";
}
