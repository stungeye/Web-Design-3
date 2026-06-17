import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SemanticElementsDemo from "./SemanticElementsDemo.jsx";

describe("SemanticElementsDemo", () => {
  it("renders visible semantic elements and matching HTML code", () => {
    const { container } = render(<SemanticElementsDemo />);

    expect(screen.getByRole("group", { name: "Visible semantic elements demo" }))
      .toBeInTheDocument();
    expect(screen.getByLabelText("Light styling")).toBeChecked();
    expect(screen.getByText("Are pets allowed?")).toBeInTheDocument();
    expect(screen.getByText("Gimli Harbour is a popular summer walking route."))
      .toBeInTheDocument();
    expect(container.querySelector(".semantic-elements-demo__examples time"))
      .toHaveTextContent("Saturday at 9 a.m.");
    expect(container.querySelector(".semantic-elements-demo__examples dt"))
      .toHaveTextContent("Admission");
    expect(container.querySelector(".semantic-elements-demo__examples cite"))
      .toHaveTextContent("Tourism Gimli Visitor Guide");
    expect(container.querySelector(".semantic-elements-demo__examples address"))
      .toHaveTextContent("Gimli Visitor Information Centre");
    expect(screen.getByRole("button", { name: "Copy semantic elements HTML code" }))
      .toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copy semantic elements CSS code" }))
      .not.toBeInTheDocument();
    expect(getCodeBlockContaining("<details>")).toBeInTheDocument();
    expect(getCodeBlockContaining("</section>")).toBeInTheDocument();
    expect(container.querySelector(".token.tag")).toHaveTextContent("section");
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
