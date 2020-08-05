module.exports = {
  cacheDirectory: '.jest-cache',

  clearMocks: true,

  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: ['test.util.ts', 'custom-error.util.ts'],

  preset: 'ts-jest',

  testEnvironment: 'node',

  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/coverage/',
    '/.jest-cache/'
  ]
}
