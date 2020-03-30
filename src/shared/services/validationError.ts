import { ErrorMessage } from '../../constants/errorMessages';

export class ValidationError extends Error {
  status: number;
  errors: any[];
  code: string;

  constructor({ code, message }: ErrorMessage, errors: any[] = []) {
    super(message);

    this.errors = errors;
    this.status = 400;
    this.code = code;
  }
}
