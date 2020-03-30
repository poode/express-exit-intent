import { djaty } from '@djaty/djaty-nodejs';
import { djatyConfig } from './config/djatyConfig';
djaty.init(djatyConfig);

import '@djaty/djaty-nodejs/dist/wrappers/expressRouterWrapper';

import { GlobalAcceptMimesMiddleware, InjectorService, ServerLoader,
         ServerSettings } from '@tsed/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import { ErrorHandlerPrepareMiddleware } from './middlewares/errorHandlerPrepareMiddleware';
import { SecurityMiddleware } from './middlewares/securityMiddleware';
import { InstanceStatusService } from './shared/services/instanceStatusService';
import { config as appConfig, configSym } from './config/config';
import { SubscriptionCtrl } from './modules/subscription/controllers/subscriptionCtrl';
import { Logger } from './shared/services/logger/logger';
import { LoggerFactory } from './shared/services/logger/loggerFactory';
import { getRequestIDLoggerMiddleware } from './shared/services/logger/requestIDLoggerMiddleware';
import { EnvConfig } from './config/envConfig';
import { SequelizeService } from './shared/services/sequelizeSevice';

// tslint:disable-next-line:no-require-imports
const bodyParser = require('body-parser');

// tslint:disable-next-line no-require-imports
const expWinston = require('express-winston');

const rootDir = __dirname;

@ServerSettings({
  rootDir,
  httpsPort: false,
  acceptMimes: ['application/json'],
  mount: {
    [appConfig.baseRoute]: [SubscriptionCtrl],
  },
  componentsScan: [
    `${rootDir}/**/middlewares/**/**.js`,
    `${rootDir}/**/services/**/**.js`,
  ],
  statics: {
    [appConfig.staticRoute]: `${rootDir}/../frontend`,
  },
})
export class Server extends ServerLoader {
  // noinspection JSUnusedGlobalSymbols
  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  async $beforeRoutesInit(): Promise<any> {
    const injector = await new InjectorService().load();
    const logger = (<LoggerFactory>injector.get(LoggerFactory)).getLogger('ExpressWinston');
    const expressWinston: Logger = expWinston.logger({ winstonInstance: logger });
    const instanceStatusService: InstanceStatusService = injector.get(InstanceStatusService);
    const sequelizeService: SequelizeService = injector.get(SequelizeService);
    const config: EnvConfig = injector.get(configSym);

    // First middleware to be used should be `djaty.requestHandler()`
    this
      .use(djaty.requestHandler())
      .use(getRequestIDLoggerMiddleware())
      .use(cookieParser())
      .use(GlobalAcceptMimesMiddleware)
      .use(session({ secret: config.sessionSecret }))
      .use(bodyParser.json({ limit: config.bodyParserLimit }))
      .use(bodyParser.urlencoded({ extended: true }))
      .use(SecurityMiddleware)
      .use(expressWinston)
      .use(awsServerlessExpressMiddleware.eventContext());

    await sequelizeService.init();
    await instanceStatusService.init(this.httpServer);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Called after routes has been mounted.
   */
  $afterRoutesInit(): void {
    this.use(ErrorHandlerPrepareMiddleware);

    // Last middleware to be used should be `djaty.errorHandler()`
    this.expressApp.use(djaty.errorHandler());
  }
}
