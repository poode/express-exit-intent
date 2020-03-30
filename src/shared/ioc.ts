import { registerProvider } from '@tsed/di';
import * as Sequelize from 'sequelize';

import { config } from '../config/config';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export const errorMessagesSym = Symbol('errorMessages');

registerProvider({
  provide: errorMessagesSym,
  useValue: ERROR_MESSAGES,
});

// ====================================================
export const sequelizeSym = Symbol('sequelize');

registerProvider({
  provide: sequelizeSym,
  useValue: new Sequelize(config.mySQLConfig),
});
