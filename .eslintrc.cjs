module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: "module",
  },
  rules: {
    // project-specific rules can go here
  },
};
