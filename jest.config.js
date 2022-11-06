const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const { baseUrl, paths } = compilerOptions;

module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': '@swc/jest'
    },
    clearMocks: true,
    modulePaths: [baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(paths),
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/src/configs/',
        '/src/database/',
        '/src/errors/',
        '/src/interface/',
        '/src/routes/',
        '/src/swagger/',
        '.prettierrc.js',
        '.eslintrc.js',
        'jest.config.ts'
    ],
    coverageReporters: ['clover', 'json', 'lcov', 'text', 'text-summary'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
