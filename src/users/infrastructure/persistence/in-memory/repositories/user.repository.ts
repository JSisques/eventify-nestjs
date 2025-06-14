import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { User } from 'src/users/domain/user';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly users: Map<string, User> = new Map<string, User>();

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return (
      Array.from(this.users.values()).find(
        (user) => user.email.value === email,
      ) || null
    );
  }

  async create(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async update(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async delete(user: User): Promise<User> {
    this.users.delete(user.id);
    return user;
  }
}
