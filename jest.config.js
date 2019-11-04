module.exports = {
  // https://doc.ebichu.cc/jest/docs/ja/configuration.html#modulenamemapper-object-string-string
  moduleNameMapper: {
    // https://jestjs.io/docs/ja/manual-mocks
    '^.+\\.(svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue'
  ]
}
