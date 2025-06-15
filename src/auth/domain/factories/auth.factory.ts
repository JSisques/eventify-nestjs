import { Auth } from '../auth';
import { AuthProvider } from '../value-objects/auth-provider';

export class AuthFactory {
  public static create(id: string, userId: string, provider: AuthProvider) {
    return new Auth(id, userId, provider);
  }
}
