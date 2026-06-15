import { createDemoMdxComponents } from "../../lib/demoRegistry.js";
import { slidesMdxComponents } from "./MdxComponents.jsx";

export function createSlidesMdxComponents() {
  return {
    ...slidesMdxComponents,
    ...createDemoMdxComponents(),
  };
}
