import { setupGridExplorerDemos } from "../demos/GridExplorer/gridExplorerClient.js";

setupRegisteredDemos(document);

document.addEventListener("astro:page-load", () => {
  setupRegisteredDemos(document);
});

function setupRegisteredDemos(root) {
  setupGridExplorerDemos(root);
}
