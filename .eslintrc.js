module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    rules: {
        // '@typescript-eslint/accessibility': 'off',
        'no-shadow': 0,
    },
};
