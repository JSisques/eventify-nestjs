import { User } from 'src/users/domain/user';

/**
 * Abstract class representing a user cache repository
 */
export abstract class UserCacheRepository {
  public abstract getUserById(id: string): Promise<User | null>;
  public abstract getUserByEmail(email: string): Promise<User | null>;
  public abstract setUser(user: User): Promise<void>;
  public abstract deleteUser(id: string): Promise<void>;
}
