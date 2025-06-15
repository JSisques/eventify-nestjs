import { InvalidProviderException } from '../exceptions/invalid-provider.exception';

/**
 * Value object representing an authentication provider.
 * @class AuthProvider
 */
export class AuthProvider {
  /**
   * List of allowed authentication providers.
   * @private
   * @static
   * @readonly
   * @type {string[]}
   */
  private static readonly ALLOWED_PROVIDERS = ['email', 'google', 'apple'];

  /**
   * Creates a new AuthProvider instance.
   * @constructor
   * @param {(typeof AuthProvider.ALLOWED_PROVIDERS)[number]} value - The provider string
   * @throws {InvalidProviderException} If the provider is invalid
   */
  constructor(
    public readonly value: (typeof AuthProvider.ALLOWED_PROVIDERS)[number],
  ) {
    AuthProvider.validate(value);
  }

  /**
   * Factory method to create a new AuthProvider instance.
   * @static
   * @param {string} value - The provider string
   * @returns {AuthProvider} A new AuthProvider instance
   * @throws {InvalidProviderException} If the provider is invalid
   */
  static create(value: string): AuthProvider {
    return new AuthProvider(value);
  }

  /**
   * Gets the provider value.
   * @returns {string} The provider value
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Checks if this provider equals another AuthProvider instance.
   * @param {AuthProvider} other - The AuthProvider instance to compare with
   * @returns {boolean} True if the providers are equal, false otherwise
   */
  equals(other: AuthProvider): boolean {
    return this.value === other.value;
  }

  /**
   * Validates a provider string.
   * @static
   * @param {string} value - The provider string to validate
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
