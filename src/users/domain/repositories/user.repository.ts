import { User } from '../entities/user.entity';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
