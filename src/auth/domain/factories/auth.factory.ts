import { Auth } from '../auth';
import { AuthProvider } from '../value-objects/auth-provider';

/**
 * Factory class for creating Auth instances
 * @class AuthFactory
 */
export class AuthFactory {
  /**
   * Creates a new Auth instance
   * @param {string} id - The unique identifier for the auth record
   * @param {string} userId - The associated user ID
   * @param {AuthProvider} provider - The authentication provider
   * @returns {Auth} A new Auth instance
   */
  public static create(id: string, userId: string, provider: AuthProvider) {
    return new Auth(id, userId, provider);
  }
}
