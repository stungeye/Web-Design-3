import { describe, expect, it } from "vitest";
import { ModuleParseError, parseModuleSource } from "./moduleParser.js";

describe("module parser", () => {
  it("generates a title slide from the # section", () => {
    const module = parseModuleSource(`# CSS Grid

Grid gives us two-dimensional layout control.

<Note>
Use grid for two-dimensional layout.
</Note>

## Grid Containers

A grid starts with \`display: grid\`.
`);

    expect(module.title).toBe("CSS Grid");
    expect(module.openingContent).toBe(
      "Grid gives us two-dimensional layout control.\n\n<Note>\nUse grid for two-dimensional layout.\n</Note>",
    );
    expect(module.slides[0]).toMatchObject({
      kind: "title",
      title: "CSS Grid",
      headingDepth: 1,
      body: module.openingContent,
    });
    expect(module.slides[0].source).toBe(
      "# CSS Grid\n\nGrid gives us two-dimensional layout control.\n\n<Note>\nUse grid for two-dimensional layout.\n</Note>",
    );
  });

  it("generates exactly one slide for each ## section", () => {
    const module = parseModuleSource(`# CSS Grid

Opening content.

## Grid Containers

A grid starts with \`display: grid\`.

## Template Areas

Named areas describe layout regions.
`);

    expect(module.sections.map((section) => section.title)).toEqual([
      "Grid Containers",
      "Template Areas",
    ]);
    expect(module.slides.map((slide) => slide.title)).toEqual([
      "CSS Grid",
      "Grid Containers",
      "Template Areas",
    ]);
  });

  it("keeps ### and deeper headings inside the current slide", () => {
    const module = parseModuleSource(`# CSS Grid

## Grid Containers

Start the slide.

### Intrinsic Tracks

This is still the grid containers slide.

#### Min Content

Still nested content.
`);

    expect(module.sections).toHaveLength(1);
    expect(module.sections[0]).toMatchObject({
      title: "Grid Containers",
      headingDepth: 2,
    });
    expect(module.sections[0].body).toContain("### Intrinsic Tracks");
    expect(module.sections[0].body).toContain("#### Min Content");
    expect(module.slides).toHaveLength(2);
  });

  it("keeps opening content on the title slide", () => {
    const module = parseModuleSource(`# Semantic HTML

Meaning comes before appearance.

![Page regions](./images/page-regions.svg)

## Landmarks

Landmarks expose page regions.
`);

    expect(module.openingContent).toContain("Meaning comes before appearance.");
    expect(module.openingContent).toContain("![Page regions]");
    expect(module.slides[0].body).toBe(module.openingContent);
  });

  it("ignores headings inside fenced code blocks", () => {
    const module = parseModuleSource(`# Code Examples

## Markdown Fence

\`\`\`md
# Not The Module Title
## Not A Slide
\`\`\`

The slide keeps going.
`);

    expect(module.title).toBe("Code Examples");
    expect(module.sections).toHaveLength(1);
    expect(module.sections[0].body).toContain("## Not A Slide");
  });

  it("fails clearly when a module has no # H1", () => {
    expect(() => parseModuleSource("## Headerless Slide\n\nContent.")).toThrow(
      ModuleParseError,
    );
    expect(() => parseModuleSource("## Headerless Slide\n\nContent.")).toThrow(
      "Missing # H1 in module source.",
    );
  });

  it("rejects content before the # H1", () => {
    expect(() =>
      parseModuleSource(`Intro text before the title.

# Actual Title

## Section

Content.
`),
    ).toThrow("Content before # H1 is not allowed.");
  });

  it("rejects a ## before the # H1 as a headerless slide", () => {
    expect(() =>
      parseModuleSource(`## Early Section

Content.

# Actual Title
`),
    ).toThrow("Headerless slide before # H1 is not allowed.");
  });

  it("rejects malformed heading structures", () => {
    expect(() => parseModuleSource("#\n\n## Section\n")).toThrow(
      "Malformed heading on line 1.",
    );
    expect(() =>
      parseModuleSource(`# First Title

## Section

# Second Title
`),
    ).toThrow("Multiple # H1 headings are not allowed.");
  });
});
