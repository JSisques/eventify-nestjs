import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../presenters/http/users.controller';
import { CreateUserCommandHandler } from './commands/create-user.command-handler';
import { DeleteUserCommandHandler } from './commands/delete-user.command-handler';
import { UserCreatedEventHandler } from './event-handlers/user-created.event-handler';
import { UserDeletedEventHandler } from './event-handlers/user-deleted.event-handler';
import { UserFactory } from '../domain/factories/user.factory';
import { UpdateUserCommandHandler } from './commands/update-user.command-handler';
import { UserUpdatedEventHandler } from './event-handlers/user-updated.event-handler';
import { GetUserByEmailQueryHandler } from './queries/get-user-by-email.query-handler';
import { GetUserByIdQueryHandler } from './queries/get-user-by-id.query-handler';
import { GetUsersQueryHandler } from './queries/get-users.query-handler';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UserFactory,
    CreateUserCommandHandler,
    UserCreatedEventHandler,
    UpdateUserCommandHandler,
    UserUpdatedEventHandler,
    DeleteUserCommandHandler,
    UserDeletedEventHandler,
    GetUsersQueryHandler,
    GetUserByEmailQueryHandler,
    GetUserByIdQueryHandler,
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
