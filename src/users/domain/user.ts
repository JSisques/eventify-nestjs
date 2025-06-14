import { UserEmail } from './value-objects/user-email';
import { UserPassword } from './value-objects/user-password';

/**
 * Represents a user entity in the system
 */
export class User {
  /**
   * Creates a new User instance
   * @param id - The unique identifier of the user
   * @param name - The name of the user
   * @param email - The email address of the user as a UserEmail value object
   * @param password - The password of the user as a UserPassword value object
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: UserEmail,
    public readonly password: UserPassword,
  ) {}
}
