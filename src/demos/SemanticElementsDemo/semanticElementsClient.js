import { setHighlightedCode } from "../../lib/liveCodeHighlighting.js";
import {
  defaultSemanticElementState,
  getSemanticElement,
  semanticElementExamples,
} from "./semanticElementsModel.js";

export function setupSemanticElementsDemos(root = document) {
  root.querySelectorAll("[data-semantic-elements-demo]").forEach((demo) => {
    if (demo.dataset.semanticElementsReady === "true") {
      return;
    }

    demo.dataset.semanticElementsReady = "true";
    demo.addEventListener("click", (event) => handleNavigation(event, demo));
    demo.addEventListener("input", () => updateStyle(demo));
    demo.addEventListener("change", () => updateStyle(demo));
    updateDemo(demo);
    updateStyle(demo);
  });
}

function handleNavigation(event, demo) {
  const action = event.target.closest("[data-elements-action]")?.dataset.elementsAction;

  if (!action) {
    return;
  }

  const currentIndex = getCurrentIndex(demo);
  const nextIndex = action === "previous" ? currentIndex - 1 : currentIndex + 1;
  demo.dataset.elementsIndex = String(nextIndex);
  updateDemo(demo);
}

function updateDemo(demo) {
  const currentIndex = getCurrentIndex(demo);
  const element = getSemanticElement(currentIndex);
  const visibleIndex =
    ((currentIndex % semanticElementExamples.length) + semanticElementExamples.length)
      % semanticElementExamples.length;

  demo.dataset.elementsIndex = String(visibleIndex);
  demo.querySelector("[data-elements-title]").textContent = `<${element.name}>`;
  demo.querySelector("[data-elements-summary]").textContent = element.summary;
  demo.querySelector("[data-elements-count]").textContent =
    `${visibleIndex + 1} of ${semanticElementExamples.length}`;

  const preview = demo.querySelector("[data-elements-preview]");

  if (preview) {
    preview.innerHTML = element.previewHtml;
  }

  const htmlCode = demo.querySelector('[data-elements-code="html"]');

  if (htmlCode) {
    setHighlightedCode(htmlCode, element.htmlCode, "html");
  }
}

function updateStyle(demo) {
  const stylingControl = demo.querySelector('[data-elements-control="light-styling"]');
  demo.dataset.elementsStyle = stylingControl?.checked ? "light" : "default";
}

function getCurrentIndex(demo) {
  const currentIndex = Number.parseInt(
    demo.dataset.elementsIndex ?? defaultSemanticElementState.index,
    10,
  );

  return Number.isNaN(currentIndex) ? defaultSemanticElementState.index : currentIndex;
}
