import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../presenters/http/users.controller';
import { CreateUserCommandHandler } from './commands/create-user.command-handler';
import { DeleteUserCommandHandler } from './commands/delete-user.command-handler';
import { UserCreatedEventHandler } from './event-handlers/user-created.event-handler';
import { UserDeletedEventHandler } from './event-handlers/user-deleted.event-handler';
import { UserFactory } from '../domain/factories/user.factory';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UserFactory,
    CreateUserCommandHandler,
    UserCreatedEventHandler,
    DeleteUserCommandHandler,
    UserDeletedEventHandler,
  ],
})
export class UsersModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: UsersModule,
      imports: [infrastructureModule],
    };
  }
}
