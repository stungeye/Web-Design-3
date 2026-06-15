import { readFile } from "node:fs/promises";
import { parseModuleSource } from "./moduleParser.js";

export async function getModuleSlidesData(module) {
  const source = await readFile(module.filePath, "utf8");
  const parsedModule = parseModuleSource(source);

  return {
    parsedModule,
    slideCount: parsedModule.slides.length,
  };
}
