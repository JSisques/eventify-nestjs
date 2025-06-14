import { User } from '../../domain/user';

/**
 * Abstract class representing a user repository
 */
export abstract class UserRepository {
  public abstract findAll(): Promise<User[]>;
  public abstract findById(id: string): Promise<User | null>;
  public abstract findByEmail(email: string): Promise<User | null>;
  public abstract create(user: User): Promise<User>;
  public abstract update(user: User): Promise<User>;
  public abstract delete(id: string): Promise<User>;
}
