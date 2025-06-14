import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { User } from 'src/users/domain/user';
import { UserMapper } from '../mapper/user.mapper';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly logger = new Logger(InMemoryUserRepository.name);
  private readonly users: Map<string, UserEntity> = new Map<
    string,
    UserEntity
  >();

  async findAll(): Promise<User[]> {
    this.logger.debug('Finding all users');
    const entities = Array.from(this.users.values());
    this.logger.debug(`Found ${entities.length} users`);

    return entities.map((entity) => UserMapper.toDomain(entity));
  }

  async findById(id: string): Promise<User | null> {
    const entity = this.users.get(id);
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async create(user: User): Promise<User> {
    const entity = UserMapper.toPersistence(user);
    this.users.set(entity.id, entity);

    const newUser = this.users.get(entity.id);
    this.logger.debug(`Created user: ${newUser}`);

    return UserMapper.toDomain(newUser);
  }

  async update(user: User): Promise<User> {
    this.logger.debug(`Updating user: ${JSON.stringify(user)}`);

    const entity = UserMapper.toPersistence(user);
    this.users.set(entity.id, entity);

    const updatedUser = this.users.get(entity.id);
    this.logger.debug(`Updated user: ${JSON.stringify(updatedUser)}`);

    return UserMapper.toDomain(updatedUser);
  }

  async delete(user: User): Promise<User> {
    const entity = UserMapper.toPersistence(user);
    this.users.delete(entity.id);

    const deletedUser = this.users.get(entity.id);
    this.logger.debug(`Deleted user: ${deletedUser}`);

    return UserMapper.toDomain(deletedUser);
  }
}
