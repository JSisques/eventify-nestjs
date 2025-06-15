import * as bcrypt from 'bcrypt';
import { InvalidHashedPasswordException } from '../exceptions/invalid-hashed-password.exception';

/**
 * Value Object representing a hashed password.
 */
export class AuthHashedPassword {
  private static readonly MIN_LENGTH = 60; // bcrypt hashes are 60 chars

  /**
   * Creates a new HashedPassword instance.
   * @param value The hashed password string.
   * @throws {InvalidHashedPasswordException} If the hashed password is invalid.
   */
  constructor(private readonly value: string) {
    if (!value || value.length < AuthHashedPassword.MIN_LENGTH) {
      throw new InvalidHashedPasswordException(value);
    }
  }

  /**
   * Returns the hashed password value.
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Compares a plain password with the hashed password.
   * @param plainPassword The plain password to compare.
   * @returns True if the password matches, false otherwise.
   */
  public async compare(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.value);
  }

  /**
   * Creates a HashedPassword from a plain password.
   * @param plainPassword The plain password to hash.
   * @returns A new HashedPassword instance.
   */
  public static async fromPlain(
    plainPassword: string,
  ): Promise<AuthHashedPassword> {
    if (!plainPassword || plainPassword.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    const hash = await bcrypt.hash(plainPassword, 10);
    return new AuthHashedPassword(hash);
  }
}
