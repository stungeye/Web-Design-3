import "./SkeletonReadingDemo.css";
import {
  defaultSkeletonReadingState,
  skeletons,
} from "./skeletonReadingModel.js";

export default function SkeletonReadingDemo() {
  const initialIndex = defaultSkeletonReadingState.index;

  return (
    <section
      className="skeleton-reading-demo"
      data-skeleton-reading-demo
      data-skeleton-index={initialIndex}
      role="group"
      aria-label="From skeleton to reading experience demo"
    >
      <div className="skeleton-reading-demo__toolbar" aria-label="Skeleton controls">
        <button
          className="skeleton-reading-demo__button"
          type="button"
          data-skeleton-control="previous"
          aria-label="Show previous skeleton"
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <div className="skeleton-reading-demo__status" aria-live="polite">
          <span data-skeleton-title>{skeletons[initialIndex].title}</span>
          <span data-skeleton-count>
            {initialIndex + 1} / {skeletons.length}
          </span>
        </div>
        <button
          className="skeleton-reading-demo__button"
          type="button"
          data-skeleton-control="next"
          aria-label="Show next skeleton"
        >
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <div className="skeleton-reading-demo__workspace">
        <div className="skeleton-reading-demo__stage" aria-label="Page skeleton stage">
          <div className="skeleton-reading-demo__panel-label">Page skeleton</div>
          {skeletons.map((skeleton, index) => (
            <SkeletonText
              key={skeleton.title}
              skeleton={skeleton}
              hidden={index !== initialIndex}
              index={index}
            />
          ))}
        </div>

        <div className="skeleton-reading-demo__structure" aria-label="Nested skeleton structure">
          <div className="skeleton-reading-demo__panel-label">Structure</div>
          {skeletons.map((skeleton, index) => (
            <StructurePanel
              key={skeleton.title}
              skeleton={skeleton}
              hidden={index !== initialIndex}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkeletonText({ hidden, index, skeleton }) {
  return (
    <article
      className="skeleton-reading-demo__text-panel"
      data-skeleton-panel={index}
      hidden={hidden}
    >
      <pre className="skeleton-reading-demo__outline">
        <code>{buildOutlineText(skeleton.tree)}</code>
      </pre>
      <div className="skeleton-reading-demo__panel-label">
        Reading experience
      </div>
      <p>{skeleton.summary}</p>
    </article>
  );
}

function buildOutlineText(node, depth = 0) {
  const indent = "  ".repeat(depth);
  const line = `${indent}${node.tag}`;

  if (!node.children?.length) {
    return line;
  }

  return [
    line,
    ...node.children.map((child) => buildOutlineText(child, depth + 1)),
  ].join("\n");
}

function PreviewRegion({ node }) {
  return (
    <div
      className="skeleton-reading-demo__region"
      data-region={node.tag}
      data-has-children={node.children?.length ? "true" : undefined}
    >
      <span>{node.tag}</span>
      {node.children?.length ? (
        <div className="skeleton-reading-demo__region-children">
          {node.children.map((child, index) => (
            <PreviewRegion key={`${child.tag}-${index}`} node={child} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function StructurePanel({ hidden, index, skeleton }) {
  return (
    <article
      className="skeleton-reading-demo__diagram"
      data-skeleton-panel={index}
      hidden={hidden}
    >
      <div className="skeleton-reading-demo__browser" aria-hidden="true">
        <div className="skeleton-reading-demo__browser-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="skeleton-reading-demo__page">
          {skeleton.tree.children.map((node, nodeIndex) => (
            <PreviewRegion key={`${node.tag}-${nodeIndex}`} node={node} />
          ))}
        </div>
      </div>
    </article>
  );
}
