import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LiveCodeBlock from "./LiveCodeBlock.jsx";

describe("LiveCodeBlock", () => {
  it("renders Prism-highlighted HTML snippets", () => {
    render(
      <LiveCodeBlock
        label="HTML"
        language="html"
        code={'<section class="feature-grid">Header</section>'}
      />,
    );

    expect(screen.getByText("HTML")).toBeInTheDocument();
    expect(document.querySelector(".token.tag")).toHaveTextContent("section");
    expect(document.querySelector(".token.attr-name")).toHaveTextContent("class");
  });

  it("renders Prism-highlighted CSS snippets", () => {
    render(
      <LiveCodeBlock
        label="CSS"
        language="css"
        code={".feature-grid {\n  display: grid;\n}"}
      />,
    );

    expect(screen.getByText("CSS")).toBeInTheDocument();
    expect(document.querySelector(".token.selector")).toHaveTextContent(".feature-grid");
    expect(document.querySelector(".token.property")).toHaveTextContent("display");
  });
});
