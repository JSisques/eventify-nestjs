import { Injectable, Logger } from '@nestjs/common';
import { UserCacheRepository } from 'src/users/application/ports/user-cache.repository';
import { CacheUserEntity } from '../entities/cache-user.entity';
import { CacheUserMapper } from '../mapper/cache-user.mapper';
import { User } from 'src/users/domain/user';

@Injectable()
export class InMemoryCacheUserRepository implements UserCacheRepository {
  private readonly logger = new Logger(InMemoryCacheUserRepository.name);
  private readonly users: Map<string, CacheUserEntity> = new Map<
    string,
    CacheUserEntity
  >();

  async getUserById(id: string): Promise<User | null> {
    this.logger.debug(`Getting user by id: ${id}`);
    const entity = this.users.get(id);
    return entity ? CacheUserMapper.toDomain(entity) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    this.logger.debug(`Getting user by email: ${email}`);
    const entity = Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
    return entity ? CacheUserMapper.toDomain(entity) : null;
  }

  async setUser(user: User): Promise<void> {
    this.logger.debug(`Setting user: ${user.id}`);
    this.users.set(user.id, CacheUserMapper.toPersistence(user));
  }

  async deleteUser(id: string): Promise<void> {
    this.logger.debug(`Deleting user: ${id}`);
    this.users.delete(id);
  }
}
