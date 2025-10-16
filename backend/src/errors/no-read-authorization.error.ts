import { NoAuthorizationError } from './no-authorization';

export class NoReadAuthorizationError extends NoAuthorizationError {
  constructor() {
    super();
    Object.setPrototypeOf(this, NoReadAuthorizationError.prototype);
  }
}
