/**
 * Exception thrown when an invalid password is provided
 */
export class InvalidPasswordException extends Error {
  /**
   * Creates a new InvalidPasswordException instance
   * @param password - The invalid password that caused the exception
   */
  constructor(password: string) {
    super(`Invalid password: ${password}`);
    this.name = InvalidPasswordException.name;
    this.message = `Invalid password: ${password}`;
  }
}
