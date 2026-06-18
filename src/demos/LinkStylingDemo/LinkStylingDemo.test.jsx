import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LinkStylingDemo from "./LinkStylingDemo.jsx";

describe("LinkStylingDemo", () => {
  it("renders link styling controls, preview states, and generated CSS", () => {
    const { container } = render(<LinkStylingDemo />);

    expect(screen.getByRole("group", { name: "Link styling demo" })).toBeInTheDocument();
    expect(screen.getByLabelText("Normal color")).toHaveValue("#075985");
    expect(screen.getByLabelText("Hover color")).toHaveValue("#0f766e");
    expect(screen.queryByLabelText("Use visited color")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Visited color")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Decoration style")).toHaveValue("solid");
    expect(screen.getByRole("slider", { name: /Underline thickness/ })).toHaveValue("0.08");
    expect(screen.getByRole("slider", { name: /Underline offset/ })).toHaveValue("0.16");
    expect(screen.getByLabelText("Animate hover changes")).toBeChecked();
    expect(screen.getByLabelText("Bold links")).toBeChecked();
    expect(screen.getByRole("group", { name: "Link styling preview" })).toBeInTheDocument();
    expect(screen.getByText("Planning Links")).toBeInTheDocument();
    expect(screen.getByText("Context Link")).toBeInTheDocument();
    expect(screen.getByText("Check link and hover colours against WCAG contrast requirements."))
      .toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("admission details")).not.toHaveClass("is-hovered");
    expect(screen.getByText("accessibility guide")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copy link styling HTML code" }))
      .not.toBeInTheDocument();
    expect(getCodeBlockContaining("a:visited")).not.toBeInTheDocument();
    expect(getCodeBlockContaining("a:hover")).toBeInTheDocument();
    expect(getCodeBlockContaining("color 300ms ease")).toBeInTheDocument();
    expect(getCodeBlockContaining("text-underline-offset 200ms ease")).toBeInTheDocument();
    expect(getCodeBlockContaining("text-decoration-thickness 300ms ease")).not.toBeInTheDocument();
    expect(getCodeBlockContaining("text-decoration-style: solid;")).toBeInTheDocument();
    expect(getCodeBlockContaining("font-weight: 600;")).toBeInTheDocument();
    expect(container.querySelector("[data-link-styling-demo]")).toHaveStyle({
      "--link-demo-color": "#075985",
      "--link-demo-hover-color": "#0f766e",
      "--link-demo-thickness": "0.08em",
      "--link-demo-weight": "600",
    });
    expect(container.querySelector("[data-link-styling-demo]").dataset.linkStylingAnimate)
      .toBe("enabled");
  });
});

function getCodeBlockContaining(text) {
  return screen.queryByText((_, element) => {
    return element?.tagName.toLowerCase() === "code" && element.textContent.includes(text);
  });
}
