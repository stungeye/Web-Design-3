import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import GridExplorer from "./GridExplorer.jsx";

describe("GridExplorer", () => {
  it("renders labeled controls, generated code panes, and a preview", () => {
    const { container } = render(<GridExplorer />);

    expect(screen.getByRole("group", { name: "Grid Explorer demo" })).toBeInTheDocument();
    expect(screen.getByLabelText("Column recipe")).toBeInTheDocument();
    expect(screen.getByLabelText("Gap")).toBeInTheDocument();
    expect(screen.getByLabelText("Item alignment")).toBeInTheDocument();
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
  });

  it("updates the preview and generated CSS from the controls", async () => {
    const user = userEvent.setup();

    render(<GridExplorer />);

    await user.selectOptions(screen.getByLabelText("Column recipe"), "sidebar");
    await user.selectOptions(screen.getByLabelText("Item alignment"), "center");
    fireEvent.change(screen.getByLabelText("Gap"), { target: { value: "32" } });
    await user.click(screen.getByLabelText("Header spans all columns"));

    expect(
      getCodeBlockContaining(
        "grid-template-columns: minmax(12rem, 18rem) minmax(0, 1fr);",
      ),
    ).toBeInTheDocument();
    expect(getCodeBlockContaining("gap: 2rem;")).toBeInTheDocument();
    expect(getCodeBlockContaining("align-items: center;")).toBeInTheDocument();
    expect(getCodeBlockContaining("grid-column: 1 / -1;")).not.toBeInTheDocument();

    const preview = screen.getByRole("group", { name: "Grid preview" }).firstElementChild;
    expect(preview).toHaveStyle({
      "--grid-template-columns": "minmax(12rem, 18rem) minmax(0, 1fr)",
      "--grid-gap": "2rem",
      "--grid-align-items": "center",
    });
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
