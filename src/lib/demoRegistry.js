import GridExplorer from "../demos/GridExplorer/GridExplorer.jsx";
import SemanticStructureDemo from "../demos/SemanticStructureDemo/SemanticStructureDemo.jsx";
import { demoMetadata } from "./demoMetadata.js";
import { DemoResolutionError } from "./mdxComponentValidation.js";

const demoDefinitions = Object.freeze([
  {
    ...demoMetadata.find((demo) => demo.name === "GridExplorer"),
    component: GridExplorer,
  },
  {
    ...demoMetadata.find((demo) => demo.name === "SemanticStructureDemo"),
    component: SemanticStructureDemo,
  },
]);

const demoDefinitionsByName = new Map(
  demoDefinitions.map((definition) => [definition.name, definition]),
);

export {
  DemoResolutionError,
  findMdxComponentReferences,
  validateDemoReferences,
} from "./mdxComponentValidation.js";

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

function getDemoRoutePath(name) {
  return `/demos/${name}/`;
}
