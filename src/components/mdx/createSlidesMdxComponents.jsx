import { slidesMdxComponents } from "./MdxComponents.jsx";
import { DemoPlaceholder } from "./createNotesMdxComponents.jsx";

export function createSlidesMdxComponents() {
  return {
    ...slidesMdxComponents,
    GridExplorer() {
      return <DemoPlaceholder name="Grid Explorer" />;
    },
    SemanticStructureDemo() {
      return <DemoPlaceholder name="Semantic Structure Demo" />;
    },
  };
}
