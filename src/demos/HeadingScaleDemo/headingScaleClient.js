import { setHighlightedCode } from "../../lib/liveCodeHighlighting.js";
import {
  buildHeadingScaleCss,
  clampHeadingLevelCount,
  defaultHeadingScaleState,
  getHeadingLevels,
  getHeadingScaleSizes,
  maxHeadingLevelCount,
  minHeadingLevelCount,
} from "./headingScaleModel.js";

export function setupHeadingScaleDemos(root = document) {
  root.querySelectorAll("[data-heading-scale-demo]").forEach((demo) => {
    if (demo.dataset.headingScaleReady === "true") {
      return;
    }

    demo.dataset.headingScaleReady = "true";
    demo.addEventListener("input", () => updateDemo(demo));
    demo.addEventListener("change", () => updateDemo(demo));
    demo.addEventListener("click", (event) => {
      const button = event.target.closest("[data-heading-scale-action]");

      if (!button || !demo.contains(button)) {
        return;
      }

      updateLevelCount(demo, button.dataset.headingScaleAction);
      updateDemo(demo);
    });
    updateDemo(demo);
  });
}

function updateDemo(demo) {
  const control = demo.querySelector('[data-heading-scale-control="scale"]');

  if (!control) {
    return;
  }

  const scaleName = control.value;
  const levelCount = getCurrentLevelCount(demo);
  const sizes = getHeadingScaleSizes(scaleName, levelCount);

  syncPreviewLevels(demo, levelCount);

  Object.entries(sizes).forEach(([level, size]) => {
    const heading = demo.querySelector(`[data-heading-scale-level="${level}"]`);

    if (heading) {
      heading.style.setProperty("--heading-scale-size", size);
    }
  });

  const cssCode = demo.querySelector('[data-heading-scale-code="css"]');

  if (cssCode) {
    setHighlightedCode(cssCode, buildHeadingScaleCss(scaleName, levelCount), "css");
  }

  syncLevelButtons(demo, levelCount);
}

function updateLevelCount(demo, action) {
  const currentCount = getCurrentLevelCount(demo);
  const nextCount = action === "add-level" ? currentCount + 1 : currentCount - 1;

  demo.dataset.headingScaleLevelCount = String(clampHeadingLevelCount(nextCount));
}

function getCurrentLevelCount(demo) {
  const storedCount = demo.dataset.headingScaleLevelCount;

  if (storedCount) {
    return clampHeadingLevelCount(storedCount);
  }

  const renderedCount = demo.querySelectorAll("[data-heading-scale-level]").length;

  if (renderedCount > 0) {
    return clampHeadingLevelCount(renderedCount);
  }

  return defaultHeadingScaleState.levelCount;
}

function syncPreviewLevels(demo, levelCount) {
  const preview = demo.querySelector("[data-heading-scale-preview]");

  if (!preview) {
    return;
  }

  const levels = getHeadingLevels(levelCount);
  const includedLevels = new Set(levels);

  preview.querySelectorAll("[data-heading-scale-level]").forEach((heading) => {
    if (!includedLevels.has(heading.dataset.headingScaleLevel)) {
      heading.remove();
    }
  });

  levels.forEach((level) => {
    if (preview.querySelector(`[data-heading-scale-level="${level}"]`)) {
      return;
    }

    const heading = document.createElement("div");
    heading.dataset.headingScaleLevel = level;
    heading.textContent = `${level.toUpperCase()} Example`;
    preview.append(heading);
  });
}

function syncLevelButtons(demo, levelCount) {
  const removeButton = demo.querySelector('[data-heading-scale-action="remove-level"]');
  const addButton = demo.querySelector('[data-heading-scale-action="add-level"]');

  if (removeButton) {
    removeButton.disabled = levelCount <= minHeadingLevelCount;
  }

  if (addButton) {
    addButton.disabled = levelCount >= maxHeadingLevelCount;
  }
}
