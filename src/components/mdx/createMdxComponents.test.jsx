import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createNotesMdxComponents } from "./createNotesMdxComponents.jsx";
import { createSlidesMdxComponents } from "./createSlidesMdxComponents.jsx";

describe("MDX demo component mappings", () => {
  it("adds standalone demo links in notes mode", () => {
    const { GridExplorer } = createNotesMdxComponents();

    render(<GridExplorer />);

    expect(
      screen.getByRole("link", { name: "Open Grid Explorer full screen in a new tab" }),
    ).toHaveAttribute("href", "/demos/GridExplorer/");
  });

  it("does not add standalone demo links in slide mode", () => {
    const { GridExplorer } = createSlidesMdxComponents();

    render(<GridExplorer />);

    expect(screen.queryByRole("link", { name: /Open Grid Explorer full screen/ })).not
      .toBeInTheDocument();
  });
});
