import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from './filters/domain-exception.filter';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
  exports: [],
})
export class SharedInfrastructureModule {}
