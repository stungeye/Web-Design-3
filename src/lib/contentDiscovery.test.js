import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  ContentDiscoveryError,
  extractModuleTitle,
  formatDisplayTitle,
  getCourseIndex,
} from "./contentDiscovery.js";

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directoryPath) =>
      rm(directoryPath, { recursive: true, force: true }),
    ),
  );
});

describe("content discovery", () => {
  it("sorts units and modules by numeric prefixes", async () => {
    const unitsDirectory = await createUnitsFixture({
      "02-css-layout": {
        "02-flexbox.mdx": "# Flexbox\n\n## Main Axis\n",
        "01-grid.mdx": "# CSS Grid\n\n## Tracks\n",
      },
      "01-semantic-html": {
        "02-landmarks.mdx": "# Landmarks\n\n## Main\n",
        "01-introduction.mdx": "# Semantic HTML\n\n## Meaning\n",
      },
    });

    const courseIndex = await getCourseIndex(unitsDirectory);

    expect(courseIndex.units.map((unit) => unit.slug)).toEqual([
      "01-semantic-html",
      "02-css-layout",
    ]);
    expect(courseIndex.units[0].modules.map((module) => module.slug)).toEqual([
      "01-introduction",
      "02-landmarks",
    ]);
    expect(courseIndex.units[1].modules.map((module) => module.slug)).toEqual([
      "01-grid",
      "02-flexbox",
    ]);
  });

  it("uses module display titles from the first # H1", async () => {
    const unitsDirectory = await createUnitsFixture({
      "01-css-layout": {
        "01-grid-track-sizing.mdx": "# Naming Things Clearly\n\n## Tracks\n",
      },
    });

    const courseIndex = await getCourseIndex(unitsDirectory);

    expect(courseIndex.units[0].modules[0]).toMatchObject({
      slug: "01-grid-track-sizing",
      title: "Naming Things Clearly",
    });
  });

  it("fails clearly when a module is missing a # H1", async () => {
    const unitsDirectory = await createUnitsFixture({
      "01-semantic-html": {
        "01-introduction.mdx": "## Meaningful Structure\n",
      },
    });

    await expect(getCourseIndex(unitsDirectory)).rejects.toThrow(ContentDiscoveryError);
    await expect(getCourseIndex(unitsDirectory)).rejects.toThrow("Missing # H1 in module:");
  });

  it("retains numeric prefixes in route paths", async () => {
    const unitsDirectory = await createUnitsFixture({
      "02-css-layout": {
        "01-grid.mdx": "# CSS Grid\n\n## Tracks\n",
      },
    });

    const courseIndex = await getCourseIndex(unitsDirectory);

    expect(courseIndex.units[0].modules[0].routePath).toBe(
      "/02-css-layout/01-grid/",
    );
  });

  it("removes numeric prefixes from display unit titles", () => {
    expect(formatDisplayTitle("01-semantic-html")).toBe("Semantic HTML");
    expect(formatDisplayTitle("02-css-layout")).toBe("CSS Layout");
  });

  it("ignores # characters inside fenced code when extracting titles", () => {
    expect(
      extractModuleTitle("```html\n# Not A Heading\n```\n\n# Actual Heading\n"),
    ).toBe("Actual Heading");
  });
});

async function createUnitsFixture(units) {
  const fixtureRoot = await mkdtemp(path.join(os.tmpdir(), "sliders-content-"));
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
