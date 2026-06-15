import { readFile } from "node:fs/promises";
import { buildSectionToc } from "./headingIds.js";
import { parseModuleSource } from "./moduleParser.js";

export async function getModuleNotesData(module) {
  const source = await readFile(module.filePath, "utf8");
  const parsedModule = parseModuleSource(source);

  return {
    parsedModule,
    tableOfContents: buildSectionToc(parsedModule.sections),
  };
}
