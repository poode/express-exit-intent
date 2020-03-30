import * as winston from 'winston';

import { winstonCustomFormat } from '../../../src/shared/services/logger/winstonCustomFormat';

export class LoggerFactory {
  static getLoggerIns(loggerLabel: string) {
    return winston.createLogger({
      format: winstonCustomFormat(loggerLabel),
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
          level: process.env.LOG_LEVEL,
        }),
      ],
    });
  }
}
