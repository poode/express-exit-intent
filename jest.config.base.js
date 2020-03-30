module.exports = {
  verbose: false,
  automock: false,
  rootDir: './src',
  testMatch: ['<rootDir>/**/*.test.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js)$': 'babel-jest',
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts}',
  ],
};
