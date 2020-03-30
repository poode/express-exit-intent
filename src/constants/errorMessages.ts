/**
 * ERROR_MESSAGES is a map object to keep our errors messages and codes
 * Every key should be an array with the following structure: [errCode, errMessage]
 */

export class ErrorMessage {
  constructor(readonly code: string, readonly message: string) { }
}

export const ERROR_MESSAGES = {
  VALIDATION: new ErrorMessage('VALIDATION', 'Validation error'),
  SUBSCRIPTION_EMAIL_DUPLICATE: new ErrorMessage('SUBSCRIPTION_EMAIL_DUPLICATE', 'Email is already subscribed!'),
};
