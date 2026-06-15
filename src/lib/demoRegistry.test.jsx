import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  DemoResolutionError,
  createDemoMdxComponents,
  findMdxComponentReferences,
  getDemo,
  listDemos,
  validateDemoReferences,
} from "./demoRegistry.js";

describe("demo registry", () => {
  it("resolves known demo names", () => {
    const demo = getDemo("GridExplorer");

    expect(demo).toMatchObject({
      name: "GridExplorer",
      title: "Grid Explorer",
      routePath: "/demos/GridExplorer/",
    });
    expect(demo.component).toBeTypeOf("function");
  });

  it("fails clearly for unknown demo names", () => {
    expect(() => getDemo("MissingDemo")).toThrow(DemoResolutionError);
    expect(() => getDemo("MissingDemo")).toThrow(
      'Unknown demo "MissingDemo". Register it in src/lib/demoRegistry.js.',
    );
  });

  it("exposes registered demo components for MDX component mappings", () => {
    const components = createDemoMdxComponents();
    const GridExplorer = components.GridExplorer;

    render(<GridExplorer />);

    expect(screen.getByRole("group", { name: "Grid Explorer demo" })).toBeInTheDocument();
  });

  it("lists standalone demo route metadata", () => {
    expect(listDemos()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "GridExplorer",
          routePath: "/demos/GridExplorer/",
        }),
      ]),
    );
  });

  it("finds uppercase MDX component references outside fenced code", () => {
    expect(
      findMdxComponentReferences(
        "# Demo\n\n<Note>Keep me.</Note>\n\n```mdx\n<MissingDemo />\n```\n\n<GridExplorer />",
      ),
    ).toEqual(["Note", "GridExplorer"]);
  });

  it("passes known demos and built-in teaching components", () => {
    expect(() =>
      validateDemoReferences(
        "# Demo\n\n<Note>Known callout.</Note>\n\n<GridExplorer />\n\n<Aside>Known notes prose.</Aside>",
        { filePath: "module.mdx" },
      ),
    ).not.toThrow();
  });

  it("fails clearly for unresolved MDX demo references", () => {
    expect(() =>
      validateDemoReferences("# Demo\n\n<MissingDemo />", {
        filePath: "src/content/units/01-demo/01-missing.mdx",
      }),
    ).toThrow(DemoResolutionError);
    expect(() =>
      validateDemoReferences("# Demo\n\n<MissingDemo />", {
        filePath: "src/content/units/01-demo/01-missing.mdx",
      }),
    ).toThrow(
      "Unresolved MDX demo component in src/content/units/01-demo/01-missing.mdx: <MissingDemo />.",
    );
  });
});
