/**
 * Exception thrown when a user is not found in the system
 */
export class UserNotFoundException extends Error {
  /**
   * Creates a new UserNotFoundException instance
   * @param message - The error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundException';
  }
}
