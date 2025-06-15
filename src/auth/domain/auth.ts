import { AuthPrimitives } from './primitives/auth-primitives';
import { AuthHashedPassword } from './value-objects/auth-hashed-password';
import { AuthProvider } from './value-objects/auth-provider';

/**
 * Represents an authentication entity that manages user authentication state and methods
 * @class Auth
 */
export class Auth {
  /**
   * Creates a new Auth instance
   * @constructor
   * @param {string} id - Unique identifier for this auth record
   * @param {string} userId - ID of the user this auth belongs to
   * @param {AuthProvider} provider - Authentication provider (email, google, apple)
   * @param {AuthHashedPassword} [hashedPassword] - Hashed password (only for email provider)
   * @param {string} [refreshToken] - Token used for refreshing access tokens
   * @param {boolean} [mfaEnabled] - Whether multi-factor authentication is enabled
   * @param {string} [mfaSecret] - Secret key for MFA if enabled
   * @param {Date} [lastLoginAt] - Timestamp of last successful login
   * @param {number} [failedLoginAttempts] - Count of consecutive failed login attempts
   * @param {boolean} [isLocked] - Whether the account is locked due to failed attempts
   */
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly provider: AuthProvider,
    public hashedPassword?: AuthHashedPassword, // Only if provider is email
    public refreshToken?: string,
    public mfaEnabled?: boolean,
    public mfaSecret?: string,
    public lastLoginAt?: Date,
    public failedLoginAttempts?: number,
    public isLocked?: boolean,
  ) {}

  /**
   * Creates an Auth instance from primitive values
   * @static
   * @param {AuthPrimitives} primitives - Object containing primitive auth values
   * @returns {Auth} New Auth instance
   */
  static fromPrimitives(primitives: AuthPrimitives): Auth {
    return new Auth(
      primitives.id,
      primitives.userId,
      AuthProvider.create(primitives.provider),
      primitives.hashedPassword
        ? new AuthHashedPassword(primitives.hashedPassword)
        : undefined,
      primitives.refreshToken,
      primitives.mfaEnabled,
      primitives.mfaSecret,
      primitives.lastLoginAt,
      primitives.failedLoginAttempts,
      primitives.isLocked,
    );
  }

  /**
   * Converts this Auth instance to primitive values
   * @returns {AuthPrimitives} Object containing primitive auth values
   */
  toPrimitives(): AuthPrimitives {
    return {
      id: this.id,
      userId: this.userId,
      provider: this.provider.getValue(),
      hashedPassword: this.hashedPassword?.getValue(),
      refreshToken: this.refreshToken,
      mfaEnabled: this.mfaEnabled,
      mfaSecret: this.mfaSecret,
      lastLoginAt: this.lastLoginAt,
      failedLoginAttempts: this.failedLoginAttempts,
      isLocked: this.isLocked,
    };
  }
}
