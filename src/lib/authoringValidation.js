import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { validateDemoReferences } from "./mdxComponentValidation.js";
import { parseModuleSource } from "./moduleParser.js";

const defaultUnitsDirectory = path.resolve("src/content/units");
const mdxExtension = ".mdx";

export class AuthoringValidationError extends Error {
  constructor(errors) {
    super(`Authoring validation failed with ${errors.length} error(s).`);
    this.name = "AuthoringValidationError";
    this.errors = errors;
  }
}

export async function validateAuthoring({
  unitsDirectory = defaultUnitsDirectory,
} = {}) {
  const errors = [];
  const modulePaths = await findDirectModuleFiles(unitsDirectory);
  const nestedModulePaths = await findNestedMdxFiles(unitsDirectory);

  for (const filePath of nestedModulePaths) {
    errors.push(
      `${filePath}: Nested .mdx files are not supported module routes. ` +
        "Move the module file directly under its unit folder, or use a non-.mdx extension for drafts.",
    );
  }

  for (const filePath of modulePaths) {
    const source = await readFile(filePath, "utf8");

    try {
      parseModuleSource(source);
      validateDemoReferences(source, { filePath });
      validatePlainTopLevelHeadings(source, { filePath });
    } catch (error) {
      if (error instanceof AuthoringValidationError) {
        errors.push(...error.errors);
      } else {
        errors.push(`${filePath}: ${error.message}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new AuthoringValidationError(errors);
  }

  return {
    filesChecked: modulePaths.length,
  };
}

export function validatePlainTopLevelHeadings(source, { filePath = "MDX source" } = {}) {
  const errors = [];
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  let fenceMarker;

  lines.forEach((line, lineIndex) => {
    const fence = line.match(/^(\s*)(`{3,}|~{3,})/);

    if (fence) {
      const marker = fence[2];
      const markerCharacter = marker[0];

      if (!fenceMarker) {
        fenceMarker = {
          character: markerCharacter,
          length: marker.length,
        };
      } else if (
        fenceMarker.character === markerCharacter &&
        marker.length >= fenceMarker.length
      ) {
        fenceMarker = undefined;
      }

      return;
    }

    if (fenceMarker) {
      return;
    }

    const heading = line.match(/^(#{1,2})\s+(.+?)\s*#*\s*$/);

    if (!heading || !hasInlineHeadingMarkup(heading[2])) {
      return;
    }

    errors.push(
      `${filePath}: Inline Markdown/MDX syntax is not supported in ${heading[1]} heading on line ${lineIndex + 1}.`,
    );
  });

  if (errors.length > 0) {
    throw new AuthoringValidationError(errors);
  }
}

function hasInlineHeadingMarkup(value) {
  return /[`<>{}]|\[[^\]]+\]\([^)]*\)|!\[[^\]]*]|\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|_[^_]+_|~~[^~]+~~/.test(
    value,
  );
}

async function findDirectModuleFiles(unitsDirectory) {
  const unitEntries = await readdir(unitsDirectory, { withFileTypes: true });
  const modulePaths = [];

  for (const unitEntry of unitEntries) {
    if (!unitEntry.isDirectory()) {
      continue;
    }

    const unitPath = path.join(unitsDirectory, unitEntry.name);
    const entries = await readdir(unitPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith(mdxExtension)) {
        modulePaths.push(path.join(unitPath, entry.name));
      }
    }
  }

  return modulePaths.sort();
}

async function findNestedMdxFiles(unitsDirectory) {
  const unitEntries = await readdir(unitsDirectory, { withFileTypes: true });
  const nestedPaths = [];

  for (const unitEntry of unitEntries) {
    if (!unitEntry.isDirectory()) {
      continue;
    }

    const unitPath = path.join(unitsDirectory, unitEntry.name);
    const entries = await readdir(unitPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const nestedMdxFiles = await findMdxFilesRecursively(path.join(unitPath, entry.name));
        nestedPaths.push(...nestedMdxFiles);
      }
    }
  }

  return nestedPaths.sort();
}

async function findMdxFilesRecursively(directoryPath) {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const filePaths = [];

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      const nestedFilePaths = await findMdxFilesRecursively(entryPath);
      filePaths.push(...nestedFilePaths);
    } else if (entry.isFile() && entry.name.endsWith(mdxExtension)) {
      filePaths.push(entryPath);
    }
  }

  return filePaths;
}
