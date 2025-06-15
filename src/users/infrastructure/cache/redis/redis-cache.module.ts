import { Module } from '@nestjs/common';
import { UserCacheRepository } from 'src/users/application/ports/user-cache.repository';
import { RedisCacheUserRepository } from './repositories/cache-user.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: UserCacheRepository,
      useClass: RedisCacheUserRepository,
    },
  ],
  exports: [UserCacheRepository],
})
export class RedisCacheModule {}
