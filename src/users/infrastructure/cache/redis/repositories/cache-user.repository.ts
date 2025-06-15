import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { UserCacheRepository } from 'src/users/application/ports/user-cache.repository';
import { User } from 'src/users/domain/user';
import { REDIS_CLIENT } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { CacheUserMapper } from '../mapper/cache-user.mapper';
import { UserEntity } from '../entities/cache-user.entity';

@Injectable()
export class RedisCacheUserRepository implements UserCacheRepository {
  private readonly logger = new Logger(RedisCacheUserRepository.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  async getUserById(id: string): Promise<User | null> {
    this.logger.debug(`Getting user by id: ${id}`);
    const entity = await this.redisClient.get(id);
    const parsedEntity = JSON.parse(entity) as UserEntity;
    return entity ? CacheUserMapper.toDomain(parsedEntity) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    this.logger.debug(`Getting user by email: ${email}`);
    const entity = await this.redisClient.get(email);
    const parsedEntity = JSON.parse(entity) as UserEntity;
    return entity ? CacheUserMapper.toDomain(parsedEntity) : null;
  }

  async setUser(user: User): Promise<void> {
    this.logger.debug(`Setting user: ${user.id}`);
    await this.redisClient.set(
      user.id,
      JSON.stringify(CacheUserMapper.toPersistence(user)),
    );
  }

  async deleteUser(id: string): Promise<void> {
    this.logger.debug(`Deleting user: ${id}`);
    await this.redisClient.del(id);
  }
}
