export class DBError extends Error {
  readonly type: string = 'DB Error';

  constructor() {
    super('Error ocurred in database');
    this.message = 'Error in database';

    Object.setPrototypeOf(this, DBError.prototype);
  }
}
