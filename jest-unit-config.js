const config = require('./jest.config')
config.testMatch = ['<rootDir>/src/**/*.spec.ts']
config.displayName = 'test-unit'

module.exports = config
