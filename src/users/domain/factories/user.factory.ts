import { randomUUID } from 'crypto';
import { User } from '../user';
import { UserEmail } from '../value-objects/user-email';
import { UserPassword } from '../value-objects/user-password';

/**
 * Factory class for creating User instances
 */
export class UserFactory {
  /**
   * Creates a new User instance with the provided data
   * @param name - The name of the user
   * @param email - The email address of the user
   * @param password - The password for the user
   * @returns A new User instance
   */
  create(name: string, email: string, password: string): User {
    const id = randomUUID();
    return new User(
      id,
      name,
      UserEmail.create(email),
      UserPassword.create(password),
    );
  }
}
