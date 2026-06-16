import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  AuthoringValidationError,
  validateAuthoring,
  validatePlainTopLevelHeadings,
} from "./authoringValidation.js";

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directoryPath) =>
      rm(directoryPath, { recursive: true, force: true }),
    ),
  );
});

describe("authoring validation", () => {
  it("passes valid direct module files", async () => {
    const unitsDirectory = await createUnitsFixture({
      "01-semantic-html": {
        "01-introduction.mdx": "# Semantic HTML\n\n## Meaning Before Appearance\n\n<Note>Use native elements.</Note>\n",
      },
    });

    await expect(validateAuthoring({ unitsDirectory })).resolves.toEqual({
      filesChecked: 1,
    });
  });

  it("reports parser and demo reference failures by file", async () => {
    const unitsDirectory = await createUnitsFixture({
      "01-semantic-html": {
        "01-introduction.mdx": "Intro before title.\n\n# Semantic HTML\n\n<MissingDemo />\n",
      },
    });

    await expect(validateAuthoring({ unitsDirectory })).rejects.toMatchObject({
      name: "AuthoringValidationError",
      errors: [expect.stringContaining("Content before # H1 is not allowed")],
    });
  });

  it("rejects nested MDX files because routes cannot import them", async () => {
    const unitsDirectory = await createUnitsFixture({
      "01-semantic-html": {
        "01-introduction.mdx": "# Semantic HTML\n\n## Meaning\n",
      },
    });
    const nestedDirectory = path.join(unitsDirectory, "01-semantic-html", "examples");
    await mkdir(nestedDirectory);
    await writeFile(path.join(nestedDirectory, "01-draft.mdx"), "# Draft\n", "utf8");

    await expect(validateAuthoring({ unitsDirectory })).rejects.toMatchObject({
      name: "AuthoringValidationError",
      errors: [expect.stringContaining("Nested .mdx files are not supported module routes")],
    });
  });

  it("rejects inline Markdown and MDX syntax in top-level headings", () => {
    expect(() =>
      validatePlainTopLevelHeadings("# CSS `Grid`\n\n## Use <main>\n", {
        filePath: "module.mdx",
      }),
    ).toThrow(AuthoringValidationError);
  });

  it("preserves exact heading validation messages in full validation", async () => {
    const unitsDirectory = await createUnitsFixture({
      "01-css-layout": {
        "01-grid.mdx": "# CSS `Grid`\n\n## Tracks\n",
      },
    });

    await expect(validateAuthoring({ unitsDirectory })).rejects.toMatchObject({
      errors: [expect.stringContaining("Inline Markdown/MDX syntax is not supported")],
    });
  });

  it("ignores heading-looking text inside fenced code blocks", () => {
    expect(() =>
      validatePlainTopLevelHeadings("# CSS Grid\n\n```mdx\n## Use <main>\n```\n", {
        filePath: "module.mdx",
      }),
    ).not.toThrow();
  });
});

async function createUnitsFixture(units) {
  const fixtureRoot = await mkdtemp(path.join(os.tmpdir(), "sliders-authoring-"));
  const unitsDirectory = path.join(fixtureRoot, "units");
  temporaryDirectories.push(fixtureRoot);

  await mkdir(unitsDirectory);

  await Promise.all(
    Object.entries(units).map(async ([unitSlug, modules]) => {
      const unitDirectory = path.join(unitsDirectory, unitSlug);
      await mkdir(unitDirectory, { recursive: true });

      await Promise.all(
        Object.entries(modules).map(([fileName, source]) =>
          writeFile(path.join(unitDirectory, fileName), source, "utf8"),
        ),
      );
    }),
  );

  return unitsDirectory;
}
