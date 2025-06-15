/**
 * Exception thrown when invalid credentials are provided during authentication
 * @class InvalidCredentialsException
 * @extends {Error}
 */
export class InvalidCredentialsException extends Error {
  /**
   * Creates a new InvalidCredentialsException instance
   * @constructor
   */
  constructor() {
    super('Invalid credentials');
    this.name = 'InvalidCredentialsException';
    this.message = 'Invalid credentials';
  }
}
