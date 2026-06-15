import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Note,
  Practice,
  Wait,
  Warning,
  notesMdxComponents,
  slidesMdxComponents,
} from "./MdxComponents.jsx";

describe("MDX callout components", () => {
  it.each([
    [Note, "Note:"],
    [Warning, "Warning:"],
    [Practice, "Best Practice:"],
    [Wait, "Wait For It:"],
  ])("renders the required visible label", (Component, label) => {
    render(
      <Component>
        <p>Keep this explanation visible.</p>
      </Component>,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText("Keep this explanation visible.")).toBeInTheDocument();
  });

  it.each([
    ["Note:", Note],
    ["Warning:", Warning],
    ["Best Practice:", Practice],
    ["Wait For It:", Wait],
  ])("exposes %s as a named note region", (label, Component) => {
    render(
      <Component>
        <p>Keep this explanation visible.</p>
      </Component>,
    );

    expect(screen.getByRole("note", { name: label })).toBeInTheDocument();
  });
});

describe("MDX component mappings", () => {
  it("renders Aside content in notes mode", () => {
    const Aside = notesMdxComponents.Aside;

    render(
      <Aside>
        <p>Notes-only teaching detail.</p>
      </Aside>,
    );

    expect(screen.getByText("Notes-only teaching detail.")).toBeInTheDocument();
    expect(screen.getByRole("note", { name: "Additional notes" })).toBeInTheDocument();
  });

  it("omits Aside content in slide mode", () => {
    const Aside = slidesMdxComponents.Aside;

    const { container } = render(
      <Aside>
        <p>Notes-only teaching detail.</p>
      </Aside>,
    );

    expect(screen.queryByText("Notes-only teaching detail.")).not.toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });

  it.each(["Note", "Warning", "Practice", "Wait"])(
    "shares %s between notes and slides",
    (componentName) => {
      expect(slidesMdxComponents[componentName]).toBe(notesMdxComponents[componentName]);
    },
  );
});
