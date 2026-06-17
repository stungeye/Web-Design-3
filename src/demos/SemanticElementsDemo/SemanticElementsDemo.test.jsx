import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SemanticElementsDemo from "./SemanticElementsDemo.jsx";

describe("SemanticElementsDemo", () => {
  it("renders a semantic element carousel and matching HTML code", () => {
    const { container } = render(<SemanticElementsDemo />);

    expect(screen.getByRole("group", { name: "Semantic elements carousel" }))
      .toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous semantic element" }))
      .toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next semantic element" }))
      .toBeInTheDocument();
    expect(screen.getByLabelText("Light styling")).toBeChecked();
    expect(screen.getByText("1 of 10")).toBeInTheDocument();
    expect(screen.getByText("<details>")).toBeInTheDocument();
    expect(screen.getByText("Are pets allowed?")).toBeInTheDocument();
    expect(screen.getByText(/optional information/))
      .toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy semantic element HTML code" }))
      .toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copy semantic elements CSS code" }))
      .not.toBeInTheDocument();
    expect(getCodeBlockContaining("<details>")).toBeInTheDocument();
    expect(getCodeBlockContaining("Are pets allowed?")).toBeInTheDocument();
    expect(container.querySelector(".token.tag")).toHaveTextContent("details");
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
