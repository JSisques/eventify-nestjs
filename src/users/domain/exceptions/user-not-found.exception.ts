/**
 * Exception thrown when a user is not found in the system
 */
export class UserNotFoundException extends Error {
  /**
   * Creates a new UserNotFoundException instance
   * @param message - The error message
   * @param userId - The ID of the user that was not found
   */
  constructor(
    message: string,
    public readonly userId: string,
  ) {
    super(message);
    this.name = 'UserNotFoundException';
    this.userId = userId;
  }
}
