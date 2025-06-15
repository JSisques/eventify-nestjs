import { Injectable, Logger } from '@nestjs/common';
import { UserCacheRepository } from 'src/users/application/ports/user-cache.repository';
import { User } from 'src/users/domain/user';

/**
 * No-operation implementation of the UserCacheRepository interface.
 * This implementation does not actually cache anything and always returns null.
 * Useful for testing or when caching needs to be disabled.
 */
@Injectable()
export class NoopCacheUserRepository implements UserCacheRepository {
  private readonly logger = new Logger(NoopCacheUserRepository.name);

  /**
   * Simulates retrieving a user from cache by their ID
   * @param id - The unique identifier of the user
   * @returns Promise resolving to null
   */
  async getUserById(id: string): Promise<User | null> {
    this.logger.debug(`Getting user by id: ${id}`);
    return null;
  }

  /**
   * Simulates retrieving a user from cache by their email address
   * @param email - The email address of the user
   * @returns Promise resolving to null
   */
  async getUserByEmail(email: string): Promise<User | null> {
    this.logger.debug(`Getting user by email: ${email}`);
    return null;
  }

  /**
   * Simulates storing a user in the cache
   * @param user - The user object to be cached
   * @returns Promise that resolves when the operation is complete
   */
  async setUser(user: User): Promise<void> {
    this.logger.debug(`Setting user: ${user.id}`);
  }

  /**
   * Simulates removing a user from the cache
   * @param id - The unique identifier of the user to delete
   * @returns Promise that resolves when the operation is complete
   */
  async deleteUser(id: string): Promise<void> {
    this.logger.debug(`Deleting user: ${id}`);
  }
}
