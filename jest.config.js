const { transform } = require('typescript');

module.exports = {
   preset: 'ts-jest',
   testEnvironment: 'node',
   testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
   roots: '<rootDir>/tests',
   transform: {
      '^.+\\.ts$': 'ts-jest',
   },
   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
   moduleFileExtensions: ['ts', 'js', 'json', 'node', 'tsx', 'jsx'],
};
