const commonConfig = require('./jest.config.base');

module.exports = {
  ...commonConfig,
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.server.json',
    },
  },
};
