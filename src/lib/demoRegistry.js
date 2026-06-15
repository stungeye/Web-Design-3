import GridExplorer from "../demos/GridExplorer/GridExplorer.jsx";
import SemanticStructureDemo from "../demos/SemanticStructureDemo/SemanticStructureDemo.jsx";

const builtInMdxComponents = new Set(["Aside", "Note", "Practice", "Wait", "Warning"]);

const demoDefinitions = Object.freeze([
  {
    name: "GridExplorer",
    title: "Grid Explorer",
    component: GridExplorer,
  },
  {
    name: "SemanticStructureDemo",
    title: "Semantic Structure Demo",
    component: SemanticStructureDemo,
  },
]);

const demoDefinitionsByName = new Map(
  demoDefinitions.map((definition) => [definition.name, definition]),
);

export class DemoResolutionError extends Error {
  constructor(message) {
    super(message);
    this.name = "DemoResolutionError";
  }
}

export function listDemos() {
  return demoDefinitions.map((definition) => ({
    ...definition,
    routePath: getDemoRoutePath(definition.name),
  }));
}

export function getDemo(name) {
  const demo = demoDefinitionsByName.get(name);

  if (!demo) {
    throw new DemoResolutionError(
      `Unknown demo "${name}". Register it in src/lib/demoRegistry.js.`,
    );
  }

  return {
    ...demo,
    routePath: getDemoRoutePath(demo.name),
  };
}

export function createDemoMdxComponents() {
  return Object.fromEntries(
    demoDefinitions.map((definition) => [definition.name, definition.component]),
  );
}

export function validateDemoReferences(source, { filePath = "MDX source" } = {}) {
  const unresolvedReferences = findMdxComponentReferences(source).filter(
    (componentName) =>
      !builtInMdxComponents.has(componentName) && !demoDefinitionsByName.has(componentName),
  );

  if (unresolvedReferences.length === 0) {
    return;
  }

  const formattedReferences = unresolvedReferences
    .map((componentName) => `<${componentName} />`)
    .join(", ");

  throw new DemoResolutionError(
    `Unresolved MDX demo component in ${filePath}: ${formattedReferences}. ` +
      "Add the demo to src/demos and register it in src/lib/demoRegistry.js.",
  );
}

export function findMdxComponentReferences(source) {
  const sourceWithoutFences = stripFencedCodeBlocks(source);
  const componentNames = new Set();
  const componentPattern = /<\/?([A-Z][A-Za-z0-9]*)\b/g;

  for (const match of sourceWithoutFences.matchAll(componentPattern)) {
    componentNames.add(match[1]);
  }

  return [...componentNames];
}

function getDemoRoutePath(name) {
  return `/demos/${name}/`;
}

function stripFencedCodeBlocks(source) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  let fenceMarker;

  return lines
    .map((line) => {
      const fence = line.match(/^(\s*)(`{3,}|~{3,})/);

      if (fence) {
        const marker = fence[2];
        const markerCharacter = marker[0];

        if (!fenceMarker) {
          fenceMarker = {
            character: markerCharacter,
            length: marker.length,
          };
        } else if (
          fenceMarker.character === markerCharacter &&
          marker.length >= fenceMarker.length
        ) {
          fenceMarker = undefined;
        }

        return "";
      }

      return fenceMarker ? "" : line;
    })
    .join("\n");
}
