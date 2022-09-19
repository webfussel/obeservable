module.exports = {
    root: true,
    extends: [
        'standard-with-typescript'
    ],
    plugins: [
        '@typescript-eslint'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname
    },
    ignorePatterns: ['*.spec.ts'],
    rules: {
        'no-return-assign': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off'
    }
}