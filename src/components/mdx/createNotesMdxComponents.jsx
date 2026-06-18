import { createHeadingIdSlugger, slugifyHeadingText } from "../../lib/headingIds.js";
import { listDemos } from "../../lib/demoRegistry.js";
import { toSitePath } from "../../lib/siteUrls.js";
import { notesMdxComponents } from "./MdxComponents.jsx";

export function createNotesMdxComponents() {
  const h2Slugger = createHeadingIdSlugger();

  return {
    ...notesMdxComponents,
    ...createNotesDemoMdxComponents(),
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

function createNotesDemoMdxComponents() {
  return Object.fromEntries(
    listDemos().map((demo) => [
      demo.name,
      function NotesDemo(props) {
        const DemoComponent = demo.component;

        return (
          <figure className="notes-demo">
            <figcaption className="notes-demo__toolbar">
              <span>{demo.title}</span>
              <a
                aria-label={`Open ${demo.title} full screen in a new tab`}
                className="notes-demo__link"
                data-preserve-instructor=""
                href={toSitePath(demo.routePath)}
                rel="noreferrer noopener"
                target="_blank"
              >
                <span>Full screen</span>
                <span className="notes-demo__link-note">(new tab)</span>
              </a>
            </figcaption>
            <DemoComponent {...props} />
          </figure>
        );
      },
    ]),
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
