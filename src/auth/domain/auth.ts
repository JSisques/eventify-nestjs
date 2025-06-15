import { AuthProvider } from './value-objects/auth-provider';

export class Auth {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly provider: AuthProvider,
    public hashedPassword?: string, // Only if provider is email
    public refreshToken?: string,
    public mfaEnabled?: boolean,
    public mfaSecret?: string,
    public lastLoginAt?: Date,
    public failedLoginAttempts?: number,
    public isLocked?: boolean,
  ) {}
}
