import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BaseStylesheetDemo from "./BaseStylesheetDemo.jsx";

describe("BaseStylesheetDemo", () => {
  it("renders a base stylesheet toggle, varied preview content, and code", () => {
    render(<BaseStylesheetDemo />);

    const demo = screen.getByRole("group", { name: "Base stylesheet demo" });

    expect(demo).toHaveAttribute("data-base-styles", "enabled");
    expect(screen.getByLabelText("Enable A Small Base Stylesheet")).toBeChecked();
    expect(screen.getByRole("group", { name: "Base stylesheet preview" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Prairie Garden Visit Guide" }))
      .toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Review admission details" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Check availability" })).toBeInTheDocument();
    expect(getCodeBlockContaining("box-sizing: border-box;")).toBeInTheDocument();
    expect(getCodeBlockContaining("<main>")).toBeInTheDocument();
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
