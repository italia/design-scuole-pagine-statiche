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
    // disabled rules that enforce comment/empty-line requirements per request
    'padding-line-between-statements': 'off',
    'no-multiple-empty-lines': 'off',
    'lines-between-class-members': 'off',
    'line-comment-position': 'off',
    'no-inline-comments': 'off'
  },
};
