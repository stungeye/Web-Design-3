import { createHeadingIdSlugger, slugifyHeadingText } from "../../lib/headingIds.js";
import { notesMdxComponents } from "./MdxComponents.jsx";

export function createNotesMdxComponents() {
  const h2Slugger = createHeadingIdSlugger();

  return {
    ...notesMdxComponents,
    h2({ children, ...props }) {
      const headingText = extractText(children);
      const id = props.id ?? h2Slugger.slug(headingText);

      return (
        <h2 {...props} id={id}>
          {children}
        </h2>
      );
    },
    GridExplorer() {
      return <DemoPlaceholder name="Grid Explorer" />;
    },
    SemanticStructureDemo() {
      return <DemoPlaceholder name="Semantic Structure Demo" />;
    },
  };
}

function DemoPlaceholder({ name }) {
  return (
    <div className="demo-placeholder" role="group" aria-label={`${name} demo`}>
      <p className="demo-placeholder__label">Interactive demo</p>
      <p className="demo-placeholder__title">{name}</p>
      <p>
        This demo placeholder keeps the module readable until the demo registry
        and interactive component implementation land in later phases.
      </p>
    </div>
  );
}

function extractText(value) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(extractText).join(" ");
  }

  if (value?.props?.children) {
    return extractText(value.props.children);
  }

  return slugifyHeadingText(value);
}
