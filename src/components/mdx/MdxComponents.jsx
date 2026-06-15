import { useId } from "react";

const calloutTypes = {
  note: "Note:",
  warning: "Warning:",
  practice: "Best Practice:",
  wait: "Wait For It:",
};

function Callout({ children, type }) {
  const labelId = useId();
  const label = calloutTypes[type];

  return (
    <aside
      aria-labelledby={labelId}
      className={`callout callout--${type}`}
      role="note"
    >
      <p className="callout__label" id={labelId}>
        {label}
      </p>
      <div className="callout__body">{children}</div>
    </aside>
  );
}

export function Note({ children }) {
  return <Callout type="note">{children}</Callout>;
}

export function Warning({ children }) {
  return <Callout type="warning">{children}</Callout>;
}

export function Practice({ children }) {
  return <Callout type="practice">{children}</Callout>;
}

export function Wait({ children }) {
  return <Callout type="wait">{children}</Callout>;
}

export function Aside({ children }) {
  return (
    <aside className="notes-aside" aria-label="Additional notes" role="note">
      {children}
    </aside>
  );
}

function HiddenAside() {
  return null;
}

const sharedMdxComponents = {
  Note,
  Warning,
  Practice,
  Wait,
};

export const notesMdxComponents = {
  ...sharedMdxComponents,
  Aside,
};

export const slidesMdxComponents = {
  ...sharedMdxComponents,
  Aside: HiddenAside,
};
