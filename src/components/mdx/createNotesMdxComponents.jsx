import { createHeadingIdSlugger, slugifyHeadingText } from "../../lib/headingIds.js";
import { createDemoMdxComponents } from "../../lib/demoRegistry.js";
import { notesMdxComponents } from "./MdxComponents.jsx";

export function createNotesMdxComponents() {
  const h2Slugger = createHeadingIdSlugger();

  return {
    ...notesMdxComponents,
    ...createDemoMdxComponents(),
    h2({ children, ...props }) {
      const headingText = extractText(children);
      const id = props.id ?? h2Slugger.slug(headingText);

      return (
        <h2 {...props} id={id}>
          {children}
        </h2>
      );
    },
  };
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
