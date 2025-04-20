import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Configuración para TypeScript
  ...tseslint.configs.recommended,
  {
    rules: {
      // Reglas para TypeScript
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "max-params": ["error", 2],
      "max-lines-per-function": ["error", 30],
      "no-duplicate-imports": "error",
    }
  }
]);