/**
 * Represents the primitive values that make up a Auth entity
 * @typedef {Object} AuthPrimitives
 * @property {string} id - The unique identifier of the auth
 * @property {string} userId - The unique identifier of the user
 * @property {string} provider - The provider of the auth
 * @property {string} hashedPassword - The hashed password of the auth
 * @property {string} refreshToken - The refresh token of the auth
 * @property {boolean} mfaEnabled - Whether MFA is enabled for the auth
 * @property {string} mfaSecret - The MFA secret of the auth
 * @property {Date} lastLoginAt - The last login date of the auth
 * @property {number} failedLoginAttempts - The number of failed login attempts of the auth
 * @property {boolean} isLocked - Whether the auth is locked
 */
export type AuthPrimitives = {
  id: string;
  userId: string;
  provider: string;
  hashedPassword?: string;
  refreshToken?: string;
  mfaEnabled?: boolean;
  mfaSecret?: string;
  lastLoginAt?: Date;
  failedLoginAttempts?: number;
  isLocked?: boolean;
};
