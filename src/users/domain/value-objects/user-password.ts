import { InvalidPasswordException } from '../exceptions/invalid-password.exception';

/**
 * Value object representing a user's password
 */
export class UserPassword {
  /**
   * Creates a new UserPassword instance
   * @param value - The password string value
   * @throws {InvalidPasswordException} If the password is invalid
   */
  constructor(public readonly value: string) {
    UserPassword.validate(value);
  }

  /**
   * Factory method to create a new UserPassword instance
   * @param password - The password string to create from
   * @returns A new UserPassword instance
   * @throws {InvalidPasswordException} If the password is invalid
   */
  static create(password: string): UserPassword {
    return new UserPassword(password);
  }

  /**
   * Validates if a password string is valid
   * @param password - The password string to validate
   * @throws {InvalidPasswordException} If the password is invalid
   */
  static validate(password: string): void {
    if (!password) {
      throw new InvalidPasswordException(password);
    }
  }

  /**
   * Checks if this password equals another password
   * @param other - The other UserPassword to compare with
   * @returns True if the passwords are equal, false otherwise
   */
  equals(other: UserPassword): boolean {
    return this.value === other.value;
  }
}
