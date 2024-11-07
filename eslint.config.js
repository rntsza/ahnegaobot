module.exports = [
  {
    files: ["*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "eqeqeq": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 2],
      "no-multiple-empty-lines": ["warn", { max: 1 }],
      "comma-dangle": ["error", "always-multiline"],
    },
  },
];
