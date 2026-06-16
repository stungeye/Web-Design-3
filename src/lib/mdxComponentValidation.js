import { builtInMdxComponentNames, demoMetadata } from "./demoMetadata.js";

const builtInMdxComponents = new Set(builtInMdxComponentNames);
const demoComponentNames = new Set(demoMetadata.map((demo) => demo.name));

export class DemoResolutionError extends Error {
  constructor(message) {
    super(message);
    this.name = "DemoResolutionError";
  }
}

export function validateDemoReferences(source, { filePath = "MDX source" } = {}) {
  const unresolvedReferences = findMdxComponentReferences(source).filter(
    (componentName) =>
      !builtInMdxComponents.has(componentName) && !demoComponentNames.has(componentName),
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
  const sourceWithoutFences = stripIgnoredMdxRegions(source);
  const componentNames = new Set();
  const componentPattern = /<\/?([A-Z][A-Za-z0-9]*)\b/g;

  for (const match of sourceWithoutFences.matchAll(componentPattern)) {
    componentNames.add(match[1]);
  }

  return [...componentNames];
}

function stripIgnoredMdxRegions(source) {
  return stripComments(stripFencedCodeBlocks(source));
}

function stripComments(source) {
  return source
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
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
