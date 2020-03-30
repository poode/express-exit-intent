import { Sequelize } from 'sequelize-typescript';
import { Injectable, Inject } from '@tsed/di';

import { configSym } from '../../config/config';
import { EnvConfig } from '../../config/envConfig';

@Injectable()
export class SequelizeService {
  private isInitiated = false;
  private sequelize: Sequelize;

  constructor(@Inject(configSym) private config: EnvConfig) { }

  init() {
    if (this.isInitiated) {
      return;
    }

    this.isInitiated = true;
    this.sequelize =  new Sequelize(<any>this.config.mySQLConfig);

    return this.sequelize;
  }

  addModel(model: any) {
    this.init();
    this.sequelize.addModels([model]);
  }
}
