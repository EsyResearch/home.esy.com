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
    // Scrollytelling experience relies on raw <img> tags and custom hook patterns;
    // relax noisy rules while keeping the rest of the Next core-web-vitals guidance.
    rules: {
      "@next/next/no-img-element": "off",
      "react-hooks/exhaustive-deps": "off",
      "import/no-anonymous-default-export": "off"
    }
  }
];

export default eslintConfig;
