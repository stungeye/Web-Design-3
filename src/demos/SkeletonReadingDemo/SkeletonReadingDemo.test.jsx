import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkeletonReadingDemo from "./SkeletonReadingDemo.jsx";

describe("SkeletonReadingDemo", () => {
  it("renders arrow controls, a text page skeleton, and a structure visualization", () => {
    const { container } = render(<SkeletonReadingDemo />);

    expect(screen.getByRole("group", {
      name: "From skeleton to reading experience demo",
    })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show previous skeleton" }))
      .toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show next skeleton" }))
      .toBeInTheDocument();
    expect(screen.getByText("Simple page shell")).toBeInTheDocument();
    expect(screen.getByLabelText("Page skeleton stage")).toBeInTheDocument();
    expect(screen.getByLabelText("Nested skeleton structure")).toBeInTheDocument();
    expect(container.querySelector(".skeleton-reading-demo__outline")).toHaveTextContent(
      "body header main h1 section footer",
    );
    expect(container.querySelector('[data-region="header"]')).toBeInTheDocument();
    expect(container.querySelector('[data-region="main"]')).toBeInTheDocument();
    expect(container.querySelector('[data-region="footer"]')).toBeInTheDocument();
  });

  it("renders five skeleton panels for progressive enhancement", () => {
    const { container } = render(<SkeletonReadingDemo />);

    expect(container.querySelectorAll(".skeleton-reading-demo__text-panel")).toHaveLength(5);
    expect(container.querySelectorAll(".skeleton-reading-demo__diagram")).toHaveLength(5);
    expect(container.querySelectorAll('[data-skeleton-panel="0"][hidden]')).toHaveLength(0);
    expect(container.querySelectorAll('[data-skeleton-panel="1"][hidden]')).toHaveLength(2);
  });
});
