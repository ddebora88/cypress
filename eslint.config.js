const js = require("@eslint/js");
const cypressPlugin = require("eslint-plugin-cypress");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  js.configs.recommended,

  // Node-context files: cypress.config.js, eslint.config.js itself
  {
    files: ["*.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        __dirname: "readonly",
      },
    },
  },

  // Cypress test & support files
  {
    files: ["cypress/**/*.js"],
    plugins: {
      cypress: cypressPlugin,
    },
    languageOptions: {
      sourceType: "module",
      globals: {
        ...cypressPlugin.configs.globals.languageOptions.globals,
      },
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules,
      // This suite deliberately force-clicks the Produk/Program dropdown
      // links (after a real .realHover()) because the site renders them
      // with zero size until genuinely hovered — see NavigationMenu.js.
      "cypress/no-force": "off",
    },
  },

  // Must be last: turns off stylistic ESLint rules that would conflict
  // with Prettier's formatting.
  prettierConfig,

  {
    ignores: [
      "node_modules/**",
      "cypress/videos/**",
      "cypress/screenshots/**",
      "cypress/downloads/**",
      "allure-results/**",
      "allure-report/**",
    ],
  },
];
