import { InvalidUserIdException } from 'src/users/domain/exceptions/invalid-user-id.exception';

/**
 * Query to get a user by their ID
 */
export class GetUserByIdQuery {
  /**
   * Creates a new GetUserByIdQuery instance
   * @param id The ID of the user to retrieve
   * @throws {InvalidUserIdException} If the ID is empty or invalid
   */
  constructor(public readonly id: string) {
    this.validate();
  }

  /**
   * Validates that the user ID is not empty
   * @throws {InvalidUserIdException} If the ID is empty or invalid
   * @private
   */
  private validate(): void {
    if (!this.id) {
      throw new InvalidUserIdException(this.id);
    }
  }
}
