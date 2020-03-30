import { BodyParams, Controller, Get, MergeParams, PathParams, Post } from '@tsed/common';
import { Inject } from '@tsed/di';

import { SubscriptionService } from '../services/subscriptionService';
import { ReqSubscription } from '../interfaces/reqSubscription';
import { SUBSCRIBE_SCHEMA } from '../constants/subscriptionConstants';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';
import { AjvValidator } from '../../../shared/services/ajvValidatorService';
import { errorMessagesSym } from '../../../shared/ioc';

@MergeParams(true)
@Controller('/subscriptions')
export class SubscriptionCtrl {
  constructor(private subscriptionService: SubscriptionService,
              private ajvValidator: AjvValidator,
              @Inject(errorMessagesSym) private errorMessages: typeof ERROR_MESSAGES) { }

  @Get('/mailing-list')
  getMailingLest() {
    return this.subscriptionService.getMailingLest();
  }

  @Post('/')
  async subscribe(@BodyParams() body: ReqSubscription) {
    const { email }: ReqSubscription = await this.ajvValidator.validate(SUBSCRIBE_SCHEMA, body);

    return this.subscriptionService.subscribe(email);
  }
}
