const demoEnhancers = [
  {
    selector: "[data-live-code-copy]",
    load: async () => {
      const module = await import("../components/liveCodeBlockClient.js");
      return module.setupLiveCodeBlocks;
    },
  },
  {
    selector: "[data-grid-explorer]",
    load: async () => {
      const module = await import("../demos/GridExplorer/gridExplorerClient.js");
      return module.setupGridExplorerDemos;
    },
  },
];

setupRegisteredDemos(document);

document.addEventListener("astro:page-load", () => {
  setupRegisteredDemos(document);
});

async function setupRegisteredDemos(root) {
  for (const enhancer of demoEnhancers) {
    if (!containsDemo(root, enhancer.selector)) {
      continue;
    }

    const setupDemo = await enhancer.load();
    setupDemo(root);
  }
}

function containsDemo(root, selector) {
  return Boolean(root.matches?.(selector) || root.querySelector?.(selector));
}
