import { ReqSubscription } from '../interfaces/reqSubscription';
import { Schemas } from '../../../shared/services/ajvValidatorService';
import { SUBSCRIBE_SCHEMA } from '../constants/subscriptionConstants';

export const schemas: Schemas = {
  [`${SUBSCRIBE_SCHEMA}`]: <{properties: Record<keyof ReqSubscription, any>}> {
    title: 'New Subscription Endpoint',
    type: 'object',
    additionalProperties: false,
    $async: true,
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
    },

    // this errorMessage prop is optional
    errorMessage: {
      properties: {
        email: 'Invalid email format. Example of valid values: "test@example.com"',
      },
    },
    required: ['email'],
  },
};
