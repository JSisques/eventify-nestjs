import { UserEmail } from './value-objects/user-email';
import { UserPassword } from './value-objects/user-password';
import { UserPrimitives } from './primitives/user-primitives';

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

  static fromPrimitives(primitives: UserPrimitives): User {
    return new User(
      primitives.id,
      primitives.name,
      UserEmail.create(primitives.email),
      UserPassword.create(primitives.password),
    );
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id,
      name: this.name,
      email: this.email.value.toString(),
      password: this.password.value.toString(),
    };
  }
}
