import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    files: ["jest.config.ts", "**/*.test.ts", "**/tests/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-require-imports": "off", // Allow require in tests
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
