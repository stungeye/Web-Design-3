const demoEnhancers = [
  {
    selector: "[data-live-code-copy]",
    load: async () => {
      const module = await import("../components/liveCodeBlockClient.js");
      return module.setupLiveCodeBlocks;
    },
  },
  {
    selector: "[data-base-stylesheet-demo]",
    load: async () => {
      const module = await import("../demos/BaseStylesheetDemo/baseStylesheetClient.js");
      return module.setupBaseStylesheetDemos;
    },
  },
  {
    selector: "[data-box-sizing-demo]",
    load: async () => {
      const module = await import("../demos/BoxSizingDemo/boxSizingClient.js");
      return module.setupBoxSizingDemos;
    },
  },
  {
    selector: "[data-grid-explorer]",
    load: async () => {
      const module = await import("../demos/GridExplorer/gridExplorerClient.js");
      return module.setupGridExplorerDemos;
    },
  },
  {
    selector: "[data-heading-scale-demo]",
    load: async () => {
      const module = await import("../demos/HeadingScaleDemo/headingScaleClient.js");
      return module.setupHeadingScaleDemos;
    },
  },
  {
    selector: "[data-line-height-demo]",
    load: async () => {
      const module = await import("../demos/LineHeightDemo/lineHeightClient.js");
      return module.setupLineHeightDemos;
    },
  },
  {
    selector: "[data-semantic-elements-demo]",
    load: async () => {
      const module = await import("../demos/SemanticElementsDemo/semanticElementsClient.js");
      return module.setupSemanticElementsDemos;
    },
  },
  {
    selector: "[data-semantic-structure-demo]",
    load: async () => {
      const module = await import("../demos/SemanticStructureDemo/semanticStructureClient.js");
      return module.setupSemanticStructureDemos;
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
