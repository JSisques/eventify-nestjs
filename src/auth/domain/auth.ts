import { AuthPrimitives } from './primitives/auth-primitives';
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

  static fromPrimitives(primitives: AuthPrimitives): Auth {
    return new Auth(
      primitives.id,
      primitives.userId,
      AuthProvider.create(primitives.provider),
      primitives.hashedPassword,
      primitives.refreshToken,
      primitives.mfaEnabled,
      primitives.mfaSecret,
      primitives.lastLoginAt,
      primitives.failedLoginAttempts,
      primitives.isLocked,
    );
  }

  toPrimitives(): AuthPrimitives {
    return {
      id: this.id,
      userId: this.userId,
      provider: this.provider.value.toString(),
      hashedPassword: this.hashedPassword,
      refreshToken: this.refreshToken,
      mfaEnabled: this.mfaEnabled,
      mfaSecret: this.mfaSecret,
      lastLoginAt: this.lastLoginAt,
      failedLoginAttempts: this.failedLoginAttempts,
      isLocked: this.isLocked,
    };
  }
}
