export class ScrapperError extends Error {
  constructor() {
    super('Error in scrapper');

    Object.setPrototypeOf(this, ScrapperError.prototype);
  }
}
