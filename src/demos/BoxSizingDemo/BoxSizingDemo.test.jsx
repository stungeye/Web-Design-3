import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BoxSizingDemo from "./BoxSizingDemo.jsx";

describe("BoxSizingDemo", () => {
  it("renders controls, preview, and generated code", () => {
    const { container } = render(<BoxSizingDemo />);

    expect(screen.getByRole("group", { name: "Box sizing demo" })).toBeInTheDocument();
    expect(screen.getByLabelText("Box sizing")).toHaveValue("content-box");
    expect(screen.getByLabelText("Border width")).toHaveValue("0");
    expect(screen.getByLabelText("Padding")).toHaveValue("0");
    expect(screen.getByLabelText("Padding")).toHaveAttribute("max", "28");
    expect(screen.getByRole("group", { name: "Box model preview" })).toBeInTheDocument();
    expect(screen.getByText("Widths")).toBeInTheDocument();
    expect(screen.getAllByText("220px")).toHaveLength(3);
    expect(screen.queryByRole("button", { name: "Copy box sizing HTML code" }))
      .not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy box sizing CSS code" })).toBeInTheDocument();
    expect(getCodeBlockContaining("box-sizing: content-box;")).toBeInTheDocument();
    expect(getCodeBlockContaining("padding: 0px;")).toBeInTheDocument();
    expect(getCodeBlockContaining("border: 0px solid #0f766e;")).toBeInTheDocument();
    expect(container.querySelector(".box-sizing-demo__box")).toHaveStyle({
      "--box-border-width": "0px",
      "--box-sizing": "content-box",
      "--box-padding": "0px",
    });
    expect(container.querySelector(".box-sizing-demo__box"))
      .toHaveAttribute("data-box-sizing-border-width", "0");
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
