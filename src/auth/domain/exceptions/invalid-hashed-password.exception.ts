/**
 * Exception thrown when an invalid hashed password is provided
 * @class InvalidHashedPasswordException
 * @extends {Error}
 */
export class InvalidHashedPasswordException extends Error {
  /**
   * Creates a new InvalidHashedPasswordException instance
   * @constructor
   * @param {string} value - The invalid hashed password value
   */
  constructor(value: string) {
    super(`Invalid hashed password: ${value}`);
    this.name = 'InvalidHashedPasswordException';
    this.message = `Invalid hashed password: ${value}`;
  }
}
