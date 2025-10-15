export class EmailRepeatedError extends Error {
  constructor() {
    super('Email already registered ');

    Object.setPrototypeOf(this, EmailRepeatedError.prototype);
  }
}
