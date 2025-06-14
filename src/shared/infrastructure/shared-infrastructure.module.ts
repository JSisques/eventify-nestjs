import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from './filters/domain-exception.filter';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
  exports: [RedisModule],
})
export class SharedInfrastructureModule {}
