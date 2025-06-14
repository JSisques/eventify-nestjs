import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from './queries/get-users.query';
import { GetUserByEmailQuery } from './queries/get-user-by-email.query';
import { GetUserByIdQuery } from './queries/get-user-by-id.query';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { DeleteUserCommand } from './commands/delete-user.command';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  findAll() {
    this.logger.debug('Finding all users');
    return this.queryBus.execute(new GetUsersQuery());
  }

  findById(id: string) {
    this.logger.debug(`Finding user by id: ${id}`);
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  findByEmail(email: string) {
    this.logger.debug(`Finding user by email: ${email}`);
    return this.queryBus.execute(new GetUserByEmailQuery(email));
  }

  create(createUserCommand: CreateUserCommand) {
    this.logger.debug(`Creating user: ${JSON.stringify(createUserCommand)}`);
    return this.commandBus.execute(createUserCommand);
  }

  update(updateUserCommand: UpdateUserCommand) {
    this.logger.debug(`Updating user: ${JSON.stringify(updateUserCommand)}`);
    return this.commandBus.execute(updateUserCommand);
  }

  remove(deleteUserCommand: DeleteUserCommand) {
    this.logger.debug(`Removing user: ${JSON.stringify(deleteUserCommand)}`);
    return this.commandBus.execute(deleteUserCommand);
  }
}
