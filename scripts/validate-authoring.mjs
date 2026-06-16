import { AuthoringValidationError, validateAuthoring } from "../src/lib/authoringValidation.js";

try {
  const result = await validateAuthoring();
  console.log(`Authoring validation passed: ${result.filesChecked} module file(s) checked.`);
} catch (error) {
  if (error instanceof AuthoringValidationError) {
    console.error(error.message);
    for (const validationError of error.errors) {
      console.error(`- ${validationError}`);
    }
    process.exitCode = 1;
  } else {
    throw error;
  }
}
