import { InvalidEmailException } from '../exceptions/invalid-email.exception';

/**
 * Value object representing a user's email address
 */
export class UserEmail {
  /**
   * Creates a new UserEmail instance
   * @param value - The email address string
   * @throws {InvalidEmailException} If the email is invalid
   */
  constructor(public readonly value: string) {
    UserEmail.validate(value);
  }

  /**
   * Factory method to create a new UserEmail instance
   * @param email - The email address string
   * @returns A new UserEmail instance
   * @throws {InvalidEmailException} If the email is invalid
   */
  static create(email: string): UserEmail {
    return new UserEmail(email);
  }

  /**
   * Checks if this email equals another UserEmail instance
   * @param other - The UserEmail instance to compare with
   * @returns True if the emails are equal, false otherwise
   */
  equals(other: UserEmail): boolean {
    return this.value === other.value;
  }

  /**
   * Validates an email string
   * @param email - The email string to validate
   * @throws {InvalidEmailException} If the email is empty or doesn't contain '@'
   */
  static validate(email: string): void {
    if (!email) {
      throw new InvalidEmailException(email);
    }
    if (!email.includes('@')) {
      throw new InvalidEmailException(email);
    }
  }
}
