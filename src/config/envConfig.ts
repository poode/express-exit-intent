import { LoggerOptions } from 'winston';
import * as sequelize from 'sequelize';

export interface EnvConfig {
  baseRoute: string;
  staticRoute: string;
  sessionSecret: string;
  bodyParserLimit: string;
  mySQLConfig: sequelize.Options;
  logger: LoggerOptions;
}
