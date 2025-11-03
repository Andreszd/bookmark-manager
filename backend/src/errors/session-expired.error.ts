export class SessionExpiredError extends Error {
  readonly code = 403;
  error = 'SESSION_EXPIRED';

  constructor() {
    super('Session expired');

    Object.setPrototypeOf(this, SessionExpiredError.prototype);
  }
}
