import { NoAuthorizationError } from './no-authorization';

export class NoWriteAuthorizationError extends NoAuthorizationError {
  constructor() {
    super();
    Object.setPrototypeOf(this, NoWriteAuthorizationError.prototype);
  }
}
