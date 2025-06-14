import { Module } from '@nestjs/common';
import { SharedInfrastructureModule } from './infrastructure/shared-infrastructure.module';

@Module({
  imports: [SharedInfrastructureModule],
  providers: [],
  exports: [SharedInfrastructureModule],
})
export class SharedModule {}
