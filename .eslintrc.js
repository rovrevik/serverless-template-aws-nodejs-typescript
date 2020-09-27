module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
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
    ],
    rules: {
        // from recommended
        '@typescript-eslint/no-use-before-define': 'off',

        // from airbnb-base
        indent: ['error', 4],
        'import/no-unresolved': 'warn',
        'import/prefer-default-export': 'off',
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
