import { Module } from '@nestjs/common';
import { UserCacheRepository } from 'src/users/application/ports/user-cache.repository';
import { NoopCacheUserRepository } from './repositories/cache-user.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: UserCacheRepository,
      useClass: NoopCacheUserRepository,
    },
  ],
  exports: [UserCacheRepository],
})
export class NoopCacheModule {}
