const config = require('./jest.config')
config.testMatch = ['<rootDir>/src/**/*.end2end.ts']
config.displayName = 'end2end-test'

module.exports = config
