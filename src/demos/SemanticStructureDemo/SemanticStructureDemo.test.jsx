import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SemanticStructureDemo from "./SemanticStructureDemo.jsx";

describe("SemanticStructureDemo", () => {
  it("renders a markup version control and generated HTML", () => {
    const { container } = render(<SemanticStructureDemo />);

    expect(screen.getByRole("group", { name: "Semantic structure demo" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Markup version" }))
      .toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Semantic HTML" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Generic markup" })).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Copy Visit Gimli HTML code" }))
      .toBeInTheDocument();
    expect(getCodeBlockContaining("<main>")).toBeInTheDocument();
    expect(container.querySelector(".token.tag")).toHaveTextContent("header");
    expect(screen.queryByRole("main")).not.toBeInTheDocument();
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
