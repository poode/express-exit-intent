import { Injectable, Inject } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { UniqueConstraintError } from 'sequelize';

import { EnvConfig } from '../../../config/envConfig';
import { configSym } from '../../../config/config';
import { schemas } from '../validation/subscriptionValidation';
import { errorMessagesSym } from '../../../shared/ioc';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';
import { AjvValidator } from '../../../shared/services/ajvValidatorService';
import { Subscription } from '../models/subscription';
import { SequelizeService } from '../../../shared/services/sequelizeSevice';
import { ValidationError } from '../../../shared/services/validationError';

@Injectable()
export class SubscriptionService implements AfterRoutesInit {

  constructor(@Inject(configSym) private readonly config: EnvConfig,
              @Inject(errorMessagesSym) private readonly errorMessages: typeof ERROR_MESSAGES,
              private readonly ajvValidator: AjvValidator,
              private readonly sequelizeService: SequelizeService) { }

  $afterRoutesInit() {
    // init the validation here as the service is singleton but the ctrl is init with every request.
    this.ajvValidator.config(schemas);
    this.sequelizeService.addModel(Subscription);
  }

  async subscribe(email: string) {
    try {
      const subscription = new Subscription({ email });

      return await subscription.save();
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        throw new ValidationError(this.errorMessages.SUBSCRIPTION_EMAIL_DUPLICATE);
      }

      throw err;
    }
  }

  getMailingLest() {
    return;
  }
}
