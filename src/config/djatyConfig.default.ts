import { UserConfigOptions, AllowedCustomLoggers, DefaultStages } from '@djaty/djaty-nodejs';

const packageJsonFile = require(`${__dirname}/../../package.json`);

//noinspection JSUnusedGlobalSymbols
export const djatyConfig: UserConfigOptions = {
  apiKey: 'exit_intent-xxxxxxx',
  apiSecret: 'exit_intent-xxxxxxx',
  showDjatyLogs: true,
  tags: ['exit-intent'],
  stage: DefaultStages.PROD,
  allowAutoSubmission: true,
  release: packageJsonFile.version,
  submissionTimeout: 10000,
  trackingOptions: {
    allowedWrappers: {
      stdLogs: true,
      http: true,
      customLoggers: [{
        name: AllowedCustomLoggers.winston,
      }],
    },
  },
};
