export class NoAuthorizationError extends Error {
  readonly code = 403;

  constructor() {
    super('No authorization');

    Object.setPrototypeOf(this, NoAuthorizationError.prototype);
  }
}
