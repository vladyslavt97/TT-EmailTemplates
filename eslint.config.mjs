import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // Disable specific rules or modify their behavior
      "react/no-unescaped-entities": "off",  // Disable this rule
      "@next/next/no-page-custom-font": "off", // Disable this rule
      // You can add more rules here as needed
      "no-console": "warn",  // For example, you can warn on console.log statements
    },
  }),
];

export default eslintConfig;
