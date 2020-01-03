module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    // 'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    // https://github.com/benmosher/eslint-plugin-import#typescript
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'jest',
    // 'import',
  ],
  rules: {
    // from recommended
    '@typescript-eslint/no-use-before-define': 'off',

    // from airbnb-base
    'no-unused-vars': 'warn',
    // '@typescript-eslint/no-unused-vars': 'warn',

    'import/no-unresolved': 'warn',
    // 'no-undef': 'warn',

    'import/prefer-default-export': 'off',
    // 'arrow-body-style': 'off',
    'no-use-before-define': 'off',
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'no-plusplus': 'off',
  },
};
