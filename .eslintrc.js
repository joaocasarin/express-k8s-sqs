module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    extends: ['airbnb-base', 'prettier'],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts']
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json'
            }
        }
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    globals: {
        NodeJS: true
    },
    ignorePatterns: ['!.prettierrc.js', '!.eslintrc.js'],
    rules: {
        'import/extensions': ['error', 'never', { json: 'always' }],
        'import/prefer-default-export': 'off',
        'import/first': 'off',
        'import/no-mutable-exports': 'off',
        'linebreak-style': ['error', 'unix'],
        '@typescript-eslint/indent': [
            'error',
            4,
            { SwitchCase: 1, ignoredNodes: ['PropertyDefinition'] }
        ],
        'comma-dangle': ['error', 'never'],
        'class-methods-use-this': 'off',
        semi: ['error', 'always'],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '__tests__/**',
                    'jest.config.ts',
                    'jest.config.js',
                    '.eslintrc.js',
                    '.prettierrc.js'
                ]
            }
        ]
    }
};
