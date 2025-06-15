import { Injectable, Logger } from '@nestjs/common';
import { UserCacheRepository } from 'src/users/application/ports/user-cache.repository';
import { UserEntity } from '../entities/cache-user.entity';
import { CacheUserMapper } from '../mapper/cache-user.mapper';
import { User } from 'src/users/domain/user';

@Injectable()
export class RedisCacheUserRepository implements UserCacheRepository {
  private readonly logger = new Logger(RedisCacheUserRepository.name);

  async getUserById(id: string): Promise<User | null> {
    this.logger.debug(`Getting user by id: ${id}`);
    throw new Error('Not implemented');
  }

  async getUserByEmail(email: string): Promise<User | null> {
    this.logger.debug(`Getting user by email: ${email}`);
    throw new Error('Not implemented');
  }

  async setUser(user: User): Promise<void> {
    this.logger.debug(`Setting user: ${user.id}`);
    throw new Error('Not implemented');
  }

  async deleteUser(id: string): Promise<void> {
    this.logger.debug(`Deleting user: ${id}`);
    throw new Error('Not implemented');
  }
}
