import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LineHeightDemo from "./LineHeightDemo.jsx";

describe("LineHeightDemo", () => {
  it("renders choices, preview text, and generated CSS", () => {
    const { container } = render(<LineHeightDemo />);

    expect(screen.getByRole("group", { name: "Line height demo" })).toBeInTheDocument();
    expect(screen.getByLabelText("line-height: 1.5")).toBeChecked();
    expect(screen.getByLabelText("line-height: calc(1em + 0.5rem)")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Line height preview" })).toBeInTheDocument();
    expect(screen.getByText("Visit The Winter Garden")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.queryByText(/Compare how the paragraph opens up/)).not.toBeInTheDocument();
    expect(getCodeBlockContaining(".reading-sample > *")).toBeInTheDocument();
    expect(getCodeBlockContaining("line-height: 1.5;")).toBeInTheDocument();
    expect(container.querySelector("[data-line-height-preview]")).toHaveStyle({
      "--line-height-demo-value": "1.5",
    });
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
