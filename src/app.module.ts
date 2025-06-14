import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { UsersModule } from './users/application/users.module';
import { UsersInfrastructureModule } from './users/infrastructure/users-infrastructure.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [CqrsModule.forRoot(), CoreModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
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
