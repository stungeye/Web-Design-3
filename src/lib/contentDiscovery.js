import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const defaultUnitsDirectory = path.resolve("src/content/units");

const mdxExtension = ".mdx";
const numericPrefixPattern = /^(\d+)-(.+)$/;
const displayAcronyms = new Map([
  ["css", "CSS"],
  ["html", "HTML"],
  ["js", "JS"],
  ["mdx", "MDX"],
]);

export class ContentDiscoveryError extends Error {
  constructor(message) {
    super(message);
    this.name = "ContentDiscoveryError";
  }
}

export async function getCourseIndex(unitsDirectory = defaultUnitsDirectory) {
  const unitEntries = await readdir(unitsDirectory, { withFileTypes: true });
  const unitDirectories = unitEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(compareNumericPrefixes);

  const units = await Promise.all(
    unitDirectories.map(async (unitSlug) => {
      const unitPath = path.join(unitsDirectory, unitSlug);
      const modulePaths = await findMdxFiles(unitPath);
      const modules = await Promise.all(
        modulePaths.sort(compareModulePaths).map(async (filePath) => {
          const moduleSlug = path.basename(filePath, mdxExtension);
          const title = await readModuleTitle(filePath);

          return {
            filePath,
            fileName: path.basename(filePath),
            slug: moduleSlug,
            title,
            routePath: `/${unitSlug}/${moduleSlug}/`,
          };
        }),
      );

      return {
        directoryPath: unitPath,
        folderName: unitSlug,
        slug: unitSlug,
        title: formatDisplayTitle(unitSlug),
        modules,
      };
    }),
  );

  return { units };
}

export async function readModuleTitle(filePath) {
  const source = await readFile(filePath, "utf8");
  const title = extractModuleTitle(source);

  if (!title) {
    throw new ContentDiscoveryError(`Missing # H1 in module: ${filePath}`);
  }

  return title;
}

export function extractModuleTitle(source) {
  let insideFence = false;

  for (const line of source.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      insideFence = !insideFence;
      continue;
    }

    if (insideFence) {
      continue;
    }

    const headingMatch = line.match(/^#\s+(.+?)\s*#*\s*$/);

    if (headingMatch) {
      return headingMatch[1].trim();
    }
  }

  return undefined;
}

export function formatDisplayTitle(slug) {
  const withoutPrefix = slug.replace(/^\d+-/, "");

  return withoutPrefix
    .split("-")
    .filter(Boolean)
    .map((word) => displayAcronyms.get(word) ?? capitalize(word))
    .join(" ");
}

export function compareNumericPrefixes(left, right) {
  const leftParts = parseNumericPrefix(left);
  const rightParts = parseNumericPrefix(right);

  if (leftParts.prefix !== rightParts.prefix) {
    return leftParts.prefix - rightParts.prefix;
  }

  return leftParts.rest.localeCompare(rightParts.rest);
}

async function findMdxFiles(directoryPath) {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const filePaths = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        return findMdxFiles(entryPath);
      }

      if (entry.isFile() && entry.name.endsWith(mdxExtension)) {
        return entryPath;
      }

      return [];
    }),
  );

  return filePaths.flat();
}

function compareModulePaths(left, right) {
  return compareNumericPrefixes(path.basename(left), path.basename(right));
}

function parseNumericPrefix(value) {
  const match = value.match(numericPrefixPattern);

  if (!match) {
    return {
      prefix: Number.POSITIVE_INFINITY,
      rest: value,
    };
  }

  return {
    prefix: Number.parseInt(match[1], 10),
    rest: match[2],
  };
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
