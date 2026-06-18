import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BoxSizingDemo from "./BoxSizingDemo.jsx";

describe("BoxSizingDemo", () => {
  it("renders controls, preview, and generated code", () => {
    const { container } = render(<BoxSizingDemo />);

    expect(screen.getByRole("group", { name: "Box sizing demo" })).toBeInTheDocument();
    expect(screen.getByLabelText("Box sizing")).toHaveValue("content-box");
    expect(screen.getByLabelText("Border width")).toHaveValue("4");
    expect(screen.getByLabelText("Padding")).toHaveValue("24");
    expect(screen.getByLabelText("Padding")).toHaveAttribute("max", "28");
    expect(screen.getByRole("group", { name: "Box model preview" })).toBeInTheDocument();
    expect(screen.getByText("Widths")).toBeInTheDocument();
    expect(screen.getByText("276px")).toBeInTheDocument();
    expect(screen.getAllByText("220px")).toHaveLength(2);
    expect(screen.queryByRole("button", { name: "Copy box sizing HTML code" }))
      .not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy box sizing CSS code" })).toBeInTheDocument();
    expect(getCodeBlockContaining("box-sizing: content-box;")).toBeInTheDocument();
    expect(getCodeBlockContaining("padding: 24px;")).toBeInTheDocument();
    expect(getCodeBlockContaining("border: 4px solid #0f766e;")).toBeInTheDocument();
    expect(container.querySelector(".box-sizing-demo__box")).toHaveStyle({
      "--box-border-width": "4px",
      "--box-sizing": "content-box",
      "--box-padding": "24px",
    });
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
