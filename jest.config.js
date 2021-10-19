module.exports = {
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>', 'src'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'jest-environment-jsdom'
};
