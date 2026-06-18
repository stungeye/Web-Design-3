import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeadingScaleDemo from "./HeadingScaleDemo.jsx";

describe("HeadingScaleDemo", () => {
  it("renders heading scale controls, preview levels, and generated CSS", () => {
    const { container } = render(<HeadingScaleDemo />);

    expect(screen.getByRole("group", { name: "Heading scale demo" })).toBeInTheDocument();
    expect(screen.getByLabelText("Heading scale")).toHaveValue("majorThird");
    expect(screen.getByRole("option", { name: "Browser defaults" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "H1 Example" }))
      .toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 6, name: "H6 Example" }))
      .toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copy heading scale HTML code" }))
      .not.toBeInTheDocument();
    expect(getCodeBlockContaining("h1 { font-size: 3.052rem; }")).toBeInTheDocument();
    expect(container.querySelector('[data-heading-scale-level="h1"]')).toHaveStyle({
      "--heading-scale-size": "3.052rem",
    });
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
