import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BaseStylesheetDemo from "./BaseStylesheetDemo.jsx";

describe("BaseStylesheetDemo", () => {
  it("renders a base stylesheet toggle, varied preview content, and code", () => {
    render(<BaseStylesheetDemo />);

    const demo = screen.getByRole("group", { name: "Base stylesheet demo" });
    const preview = screen.getByTitle("Base stylesheet preview");

    expect(demo).toHaveAttribute("data-base-styles", "enabled");
    expect(screen.getByLabelText("Enable A Small Base Stylesheet")).toBeChecked();
    expect(preview).toHaveAttribute("data-base-stylesheet-preview");
    expect(preview.getAttribute("srcdoc")).toContain("Prairie Garden Visit Guide");
    expect(preview.getAttribute("srcdoc")).toContain("<style>");
    expect(getCodeBlockContaining("box-sizing: border-box;")).toBeInTheDocument();
    expect(getCodeBlockContaining("<main>")).toBeInTheDocument();
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
