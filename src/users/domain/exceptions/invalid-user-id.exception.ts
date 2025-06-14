/**
 * Exception thrown when an invalid user ID is provided
 */
export class InvalidUserIdException extends Error {
  /**
   * Creates a new InvalidUserIdException instance
   * @param id - The invalid ID that caused the exception
   */
  constructor(id: string) {
    super(`Invalid user ID: ${id}`);
    this.name = InvalidUserIdException.name;
    this.message = `Invalid user ID: ${id}`;
  }
}
