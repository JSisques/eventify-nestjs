import { Module } from '@nestjs/common';
import { UserCacheRepository } from 'src/users/application/ports/user-cache.repository';
import { InMemoryCacheUserRepository } from './repositories/cache-user.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: UserCacheRepository,
      useClass: InMemoryCacheUserRepository,
    },
  ],
  exports: [UserCacheRepository],
})
export class InMemoryCacheModule {}
