/**
 * Exception thrown when attempting to create a user with an email that already exists
 */
export class UserAlreadyExistsException extends Error {
  /**
   * Creates a new UserAlreadyExistsException instance
   * @param email - The email address that already exists in the system
   */
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = UserAlreadyExistsException.name;
    this.message = `User with email ${email} already exists`;
  }
}
