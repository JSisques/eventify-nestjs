import { Injectable, Logger } from '@nestjs/common';
import { UserCacheRepository } from 'src/users/application/ports/user-cache.repository';
import { CacheUserEntity } from '../entities/cache-user.entity';
import { CacheUserMapper } from '../mapper/cache-user.mapper';
import { User } from 'src/users/domain/user';

/**
 * In-memory implementation of the UserCacheRepository interface.
 * Handles caching of user data in memory using a Map data structure.
 */
@Injectable()
export class InMemoryCacheUserRepository implements UserCacheRepository {
  private readonly logger = new Logger(InMemoryCacheUserRepository.name);
  private readonly users: Map<string, CacheUserEntity> = new Map<
    string,
    CacheUserEntity
  >();

  /**
   * Retrieves a user from cache by their ID
   * @param id - The unique identifier of the user
   * @returns Promise resolving to the User if found, null otherwise
   */
  async getUserById(id: string): Promise<User | null> {
    this.logger.debug(`Getting user by id: ${id}`);
    const entity = this.users.get(id);
    return entity ? CacheUserMapper.toDomain(entity) : null;
  }

  /**
   * Retrieves a user from cache by their email address
   * @param email - The email address of the user
   * @returns Promise resolving to the User if found, null otherwise
   */
  async getUserByEmail(email: string): Promise<User | null> {
    this.logger.debug(`Getting user by email: ${email}`);
    const entity = Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
    return entity ? CacheUserMapper.toDomain(entity) : null;
  }

  /**
   * Stores a user in the cache
   * @param user - The user object to be cached
   * @returns Promise that resolves when the operation is complete
   */
  async setUser(user: User): Promise<void> {
    this.logger.debug(`Setting user: ${user.id}`);
    this.users.set(user.id, CacheUserMapper.toPersistence(user));
  }

  /**
   * Removes a user from the cache
   * @param id - The unique identifier of the user to delete
   * @returns Promise that resolves when the operation is complete
   */
  async deleteUser(id: string): Promise<void> {
    this.logger.debug(`Deleting user: ${id}`);
    this.users.delete(id);
  }
}
