import {
  getNextSkeletonIndex,
  getPreviousSkeletonIndex,
  skeletons,
} from "./skeletonReadingModel.js";

export function setupSkeletonReadingDemos(root = document) {
  root.querySelectorAll("[data-skeleton-reading-demo]").forEach((demo) => {
    if (demo.dataset.skeletonReadingReady === "true") {
      return;
    }

    demo.dataset.skeletonReadingReady = "true";
    demo.addEventListener("click", (event) => {
      const control = event.target.closest("[data-skeleton-control]");

      if (!control || !demo.contains(control)) {
        return;
      }

      const currentIndex = Number(demo.dataset.skeletonIndex ?? 0);
      const nextIndex = control.dataset.skeletonControl === "previous"
        ? getPreviousSkeletonIndex(currentIndex)
        : getNextSkeletonIndex(currentIndex);

      updateDemo(demo, nextIndex);
    });

    updateDemo(demo, Number(demo.dataset.skeletonIndex ?? 0));
  });
}

function updateDemo(demo, index) {
  const skeleton = skeletons[index] ?? skeletons[0];
  const normalizedIndex = skeletons.indexOf(skeleton);
  const title = demo.querySelector("[data-skeleton-title]");
  const count = demo.querySelector("[data-skeleton-count]");

  demo.dataset.skeletonIndex = String(normalizedIndex);

  demo.querySelectorAll("[data-skeleton-panel]").forEach((panel) => {
    panel.hidden = Number(panel.dataset.skeletonPanel) !== normalizedIndex;
  });

  if (title) {
    title.textContent = skeleton.title;
  }

  if (count) {
    count.textContent = `${normalizedIndex + 1} / ${skeletons.length}`;
  }
}
