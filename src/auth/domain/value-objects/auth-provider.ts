import { InvalidProviderException } from '../exceptions/invalid-provider.exception';

/**
 * Value object representing an authentication provider
 */
export class AuthProvider {
  private static readonly ALLOWED_PROVIDERS = ['email', 'google', 'apple'];

  /**
   * Creates a new AuthProvider instance
   * @param value - The provider string
   * @throws {InvalidProviderException} If the provider is invalid
   */
  constructor(
    public readonly value: (typeof AuthProvider.ALLOWED_PROVIDERS)[number],
  ) {
    AuthProvider.validate(value);
  }

  /**
   * Factory method to create a new AuthProvider instance
   * @param value - The provider string
   * @returns A new AuthProvider instance
   * @throws {InvalidProviderException} If the provider is invalid
   */
  static create(value: string): AuthProvider {
    return new AuthProvider(value);
  }

  public getValue(): string {
    return this.value;
  }

  /**
   * Checks if this provider equals another AuthProvider instance
   * @param other - The AuthProvider instance to compare with
   * @returns True if the providers are equal, false otherwise
   */
  equals(other: AuthProvider): boolean {
    return this.value === other.value;
  }

  /**
   * Validates a provider string
   * @param value - The provider string to validate
   * @throws {InvalidProviderException} If the provider is empty or not allowed
   */
  static validate(value: string): void {
    if (!value) {
      throw new InvalidProviderException(value);
    }
    if (!AuthProvider.ALLOWED_PROVIDERS.includes(value)) {
      throw new InvalidProviderException(value);
    }
  }
}
