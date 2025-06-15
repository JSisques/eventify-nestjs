/**
 * Exception thrown when an invalid authentication provider is specified
 * @class InvalidProviderException
 * @extends {Error}
 */
export class InvalidProviderException extends Error {
  /**
   * Creates a new InvalidProviderException instance
   * @constructor
   * @param {string} value - The invalid provider value
   */
  constructor(value: string) {
    super(`Invalid provider: ${value}`);
    this.name = 'InvalidProviderException';
    this.message = `Invalid provider: ${value}`;
  }
}
