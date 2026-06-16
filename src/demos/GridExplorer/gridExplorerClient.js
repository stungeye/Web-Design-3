import { setHighlightedCode } from "../../lib/liveCodeHighlighting.js";
import {
  buildCssCode,
  formatRem,
  getColumnRecipeValue,
} from "./gridExplorerModel.js";

const minimumControlsWidth = 220;
const minimumPreviewWidth = 192;
const keyboardResizeStep = 24;

export function setupGridExplorerDemos(root = document) {
  root.querySelectorAll("[data-grid-explorer]").forEach((demo) => {
    if (demo.dataset.gridExplorerReady === "true") {
      return;
    }

    demo.dataset.gridExplorerReady = "true";
    demo.addEventListener("input", () => updateDemo(demo));
    demo.addEventListener("change", () => updateDemo(demo));
    setupResizeHandle(demo);
    updateDemo(demo);
    updateResizeHandleValue(demo);
  });
}

function setupResizeHandle(demo) {
  const handle = demo.querySelector("[data-grid-resize-handle]");
  const workspace = demo.querySelector("[data-grid-workspace]");

  if (!handle || !workspace) {
    return;
  }

  handle.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const currentWidth = getControlsWidth(demo);
    const direction = event.key === "ArrowLeft" ? 1 : -1;
    setControlsWidth(demo, currentWidth + direction * keyboardResizeStep);
  });

  handle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    handle.setPointerCapture(event.pointerId);
    demo.dataset.resizing = "true";

    const onPointerMove = (moveEvent) => {
      const bounds = workspace.getBoundingClientRect();
      setControlsWidth(demo, moveEvent.clientX - bounds.left);
    };

    const onPointerUp = (upEvent) => {
      demo.removeAttribute("data-resizing");
      handle.releasePointerCapture(upEvent.pointerId);
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", onPointerUp);
      handle.removeEventListener("pointercancel", onPointerUp);
    };

    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
    handle.addEventListener("pointercancel", onPointerUp);
  });
}

function updateDemo(demo) {
  const columnsControl = demo.querySelector('[data-grid-control="columns"]');
  const gapControl = demo.querySelector('[data-grid-control="gap"]');
  const alignmentControl = demo.querySelector('[data-grid-control="alignment"]');
  const leadControl = demo.querySelector('[data-grid-control="lead"]');
  const gapOutput = demo.querySelector('[data-grid-output="gap"]');
  const preview = demo.querySelector(".grid-explorer__preview");
  const leadCard = demo.querySelector('[data-grid-card="lead"]');
  const cssCode = demo.querySelector('[data-grid-code="css"]');

  if (!columnsControl || !gapControl || !alignmentControl || !leadControl || !preview) {
    return;
  }

  const columns = getColumnRecipeValue(columnsControl.value);
  const gapRem = formatRem(Number(gapControl.value));
  const alignItems = alignmentControl.value;
  const leadSpans = leadControl.checked;

  preview.style.setProperty("--grid-template-columns", columns);
  preview.style.setProperty("--grid-gap", gapRem);
  preview.style.setProperty("--grid-align-items", alignItems);

  if (gapOutput) {
    gapOutput.textContent = gapRem;
  }

  if (leadCard) {
    if (leadSpans) {
      leadCard.setAttribute("data-lead-spans", "true");
    } else {
      leadCard.removeAttribute("data-lead-spans");
    }
  }

  if (cssCode) {
    setHighlightedCode(
      cssCode,
      buildCssCode({ alignItems, columns, gapRem, leadSpans }),
      "css",
    );
  }
}

function setControlsWidth(demo, requestedWidth) {
  const workspace = demo.querySelector("[data-grid-workspace]");

  if (!workspace) {
    return;
  }

  const maximumWidth = workspace.clientWidth - minimumPreviewWidth;
  const width = clamp(requestedWidth, minimumControlsWidth, maximumWidth);
  workspace.style.setProperty("--grid-controls-width", `${width}px`);
  updateResizeHandleValue(demo);
}

function updateResizeHandleValue(demo) {
  const handle = demo.querySelector("[data-grid-resize-handle]");
  const workspace = demo.querySelector("[data-grid-workspace]");

  if (!handle || !workspace) {
    return;
  }

  const controlsWidth = getControlsWidth(demo);
  const previewWidth = Math.max(0, Math.round(workspace.clientWidth - controlsWidth));

  handle.setAttribute("aria-valuemin", String(minimumPreviewWidth));
  handle.setAttribute("aria-valuemax", String(Math.max(minimumPreviewWidth, workspace.clientWidth)));
  handle.setAttribute("aria-valuenow", String(previewWidth));
  handle.setAttribute("aria-valuetext", `Preview width about ${previewWidth} pixels`);
}

function getControlsWidth(demo) {
  const workspace = demo.querySelector("[data-grid-workspace]");

  if (!workspace) {
    return minimumControlsWidth;
  }

  const explicitWidth = workspace.style.getPropertyValue("--grid-controls-width");
  const parsedWidth = Number.parseFloat(explicitWidth);

  if (Number.isFinite(parsedWidth)) {
    return parsedWidth;
  }

  return Math.min(288, Math.max(minimumControlsWidth, workspace.clientWidth * 0.32));
}

function clamp(value, minimum, maximum) {
  if (maximum < minimum) {
    return minimum;
  }

  return Math.min(Math.max(value, minimum), maximum);
}
