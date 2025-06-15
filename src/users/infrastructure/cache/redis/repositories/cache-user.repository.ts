import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { UserCacheRepository } from 'src/users/application/ports/user-cache.repository';
import { User } from 'src/users/domain/user';
import { REDIS_CLIENT } from 'src/shared/infrastructure/redis/provider/redis.provider';

@Injectable()
export class RedisCacheUserRepository implements UserCacheRepository {
  private readonly logger = new Logger(RedisCacheUserRepository.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

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
