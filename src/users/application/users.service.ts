import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from './queries/get-users.query';
import { GetUserByEmailQuery } from './queries/get-user-by-email.query';
import { GetUserByIdQuery } from './queries/get-user-by-id.query';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { DeleteUserCommand } from './commands/delete-user.command';

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  findAll() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  findById(id: string) {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  findByEmail(email: string) {
    return this.queryBus.execute(new GetUserByEmailQuery(email));
  }

  create(createUserCommand: CreateUserCommand) {
    return this.commandBus.execute(createUserCommand);
  }

  update(updateUserCommand: UpdateUserCommand) {
    return this.commandBus.execute(updateUserCommand);
  }

  remove(deleteUserCommand: DeleteUserCommand) {
    return this.commandBus.execute(deleteUserCommand);
  }
}
