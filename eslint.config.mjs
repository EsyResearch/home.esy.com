// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  ...storybook.configs["flat/recommended"],
  {
    // Keep core rules active but downgrade to warnings so builds surface issues
    // without blocking while we migrate to Next <Image> and tighten hook deps.
    rules: {
      "@next/next/no-img-element": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-anonymous-default-export": "warn"
    }
  }
];

export default eslintConfig;
