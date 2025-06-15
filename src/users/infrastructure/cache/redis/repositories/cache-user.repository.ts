import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { UserCacheRepository } from 'src/users/application/ports/user-cache.repository';
import { User } from 'src/users/domain/user';
import { REDIS_CLIENT } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { CacheUserMapper } from '../mapper/cache-user.mapper';
import { UserEntity } from '../entities/cache-user.entity';

/**
 * Redis implementation of the UserCacheRepository interface.
 * Handles caching of user data in Redis.
 */
@Injectable()
export class RedisCacheUserRepository implements UserCacheRepository {
  private readonly logger = new Logger(RedisCacheUserRepository.name);

  /**
   * Creates an instance of RedisCacheUserRepository.
   * @param redisClient - The Redis client instance for database operations
   */
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  /**
   * Retrieves a user from cache by their ID
   * @param id - The unique identifier of the user
   * @returns Promise resolving to the User if found, null otherwise
   */
  async getUserById(id: string): Promise<User | null> {
    this.logger.debug(`Getting user by id: ${id}`);
    const entity = await this.redisClient.get(id);
    const parsedEntity = JSON.parse(entity) as UserEntity;
    return entity ? CacheUserMapper.toDomain(parsedEntity) : null;
  }

  /**
   * Retrieves a user from cache by their email address
   * @param email - The email address of the user
   * @returns Promise resolving to the User if found, null otherwise
   */
  async getUserByEmail(email: string): Promise<User | null> {
    this.logger.debug(`Getting user by email: ${email}`);
    const entity = await this.redisClient.get(email);
    const parsedEntity = JSON.parse(entity) as UserEntity;
    return entity ? CacheUserMapper.toDomain(parsedEntity) : null;
  }

  /**
   * Stores a user in the cache
   * @param user - The user object to be cached
   * @returns Promise that resolves when the operation is complete
   */
  async setUser(user: User): Promise<void> {
    this.logger.debug(`Setting user: ${user.id}`);
    await this.redisClient.set(
      user.id,
      JSON.stringify(CacheUserMapper.toPersistence(user)),
    );
  }

  /**
   * Removes a user from the cache
   * @param id - The unique identifier of the user to delete
   * @returns Promise that resolves when the operation is complete
   */
  async deleteUser(id: string): Promise<void> {
    this.logger.debug(`Deleting user: ${id}`);
    await this.redisClient.del(id);
  }
}
