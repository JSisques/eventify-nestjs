/**
 * Exception thrown when an invalid email is provided
 */
export class InvalidEmailException extends Error {
  /**
   * Creates a new InvalidEmailException instance
   * @param email - The invalid email that caused the exception
   */
  constructor(email: string) {
    super(`Invalid email: ${email}`);
    this.name = InvalidEmailException.name;
    this.message = `Invalid email: ${email}`;
  }
}
