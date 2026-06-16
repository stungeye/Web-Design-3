import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GridExplorer from "./GridExplorer.jsx";

describe("GridExplorer", () => {
  it("renders labeled controls, generated code panes, and a preview", () => {
    const { container } = render(<GridExplorer />);

    expect(screen.getByRole("group", { name: "Grid Explorer demo" })).toBeInTheDocument();
    expect(screen.getByLabelText("Column recipe")).toBeInTheDocument();
    expect(screen.getByLabelText("Column recipe")).toHaveValue("balanced");
    expect(screen.getByLabelText("Gap")).toHaveValue("16");
    expect(screen.getByLabelText("Item alignment")).toHaveValue("stretch");
    expect(screen.getByLabelText("Header spans all columns")).toBeChecked();
    expect(screen.getByRole("group", { name: "Grid preview" })).toBeInTheDocument();
    expect(screen.getByRole("separator", { name: "Resize preview area" })).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
    expect(getCodeBlockContaining('<section class="feature-grid">')).toBeInTheDocument();
    expect(getCodeBlockContaining("grid-template-columns: repeat(3, minmax(0, 1fr));"))
      .toBeInTheDocument();
    expect(container.querySelector(".token.selector")).toHaveTextContent(".feature-grid");
    expect([...container.querySelectorAll(".token.property")].map((token) => token.textContent))
      .toContain("grid-template-columns");

    const preview = screen.getByRole("group", { name: "Grid preview" }).firstElementChild;
    expect(preview).toHaveStyle({
      "--grid-template-columns": "repeat(3, minmax(0, 1fr))",
      "--grid-gap": "1rem",
      "--grid-align-items": "stretch",
    });
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
