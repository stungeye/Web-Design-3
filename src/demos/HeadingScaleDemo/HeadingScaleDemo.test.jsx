import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeadingScaleDemo from "./HeadingScaleDemo.jsx";

describe("HeadingScaleDemo", () => {
  it("renders heading scale controls, preview levels, and generated CSS", () => {
    const { container } = render(<HeadingScaleDemo />);

    expect(screen.getByRole("group", { name: "Heading scale demo" })).toBeInTheDocument();
    expect(screen.getByLabelText("Heading scale")).toHaveValue("majorThird");
    expect(screen.getByRole("option", { name: "Browser defaults" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Golden Ratio, 1.618" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add heading level" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove heading level" })).toBeInTheDocument();
    expect(screen.getByText("H1 Example")).toBeInTheDocument();
    expect(screen.getByText("H4 Example")).toBeInTheDocument();
    expect(screen.queryByText("H5 Example")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copy heading scale HTML code" }))
      .not.toBeInTheDocument();
    expect(getCodeBlockContaining("h1 { font-size: 1.953rem; }")).toBeInTheDocument();
    expect(getCodeBlockContaining("h4 { font-size: 1rem; }")).toBeInTheDocument();
    expect(container.querySelector('[data-heading-scale-level="h1"]')).toHaveStyle({
      "--heading-scale-size": "1.953rem",
    });
    expect(container.querySelector('[data-heading-scale-level="h4"]')).toHaveStyle({
      "--heading-scale-size": "1rem",
    });
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
