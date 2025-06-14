import { UserEmail } from '../../domain/value-objects/user-email';

/**
 * Query to get a user by their email
 */
export class GetUserByEmailQuery {
  /**
   * Creates a new GetUserByEmailQuery instance
   * @param email The email of the user to retrieve
   * @throws {InvalidEmailException} If the email is invalid
   */
  constructor(public readonly email: string) {
    this.validate();
  }

  /**
   * Validates the email using the domain validation rules
   * @throws {InvalidEmailException} If the email is invalid
   * @private
   */
  private validate(): void {
    UserEmail.validate(this.email);
  }
}
