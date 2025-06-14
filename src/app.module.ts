import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { UsersModule } from './users/application/users.module';
import { UsersInfrastructureModule } from './users/infrastructure/users-infrastructure.module';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from 'shared/infrastructure/filters/domain-exception.filter';

@Module({
  imports: [CqrsModule.forRoot(), CoreModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        UsersModule.withInfrastructure(
          UsersInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
