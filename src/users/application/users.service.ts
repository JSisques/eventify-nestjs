import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from './queries/get-users.query';
import { GetUserByEmailQuery } from './queries/get-user-by-email.query';
import { GetUserByIdQuery } from './queries/get-user-by-id.query';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { DeleteUserCommand } from './commands/delete-user.command';

/**
 * Service class that handles user-related operations using CQRS pattern
 */
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  /**
   * Creates an instance of UsersService
   * @param commandBus - Bus for dispatching commands
   * @param queryBus - Bus for dispatching queries
   */
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Retrieves all users from the system
   * @returns Promise containing array of all users
   */
  findAll() {
    this.logger.debug('Finding all users');
    return this.queryBus.execute(new GetUsersQuery());
  }

  /**
   * Finds a user by their ID
   * @param id - The ID of the user to find
   * @returns Promise containing the found user
   */
  findById(id: string) {
    this.logger.debug(`Finding user by id: ${id}`);
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  /**
   * Finds a user by their email address
   * @param email - The email address to search for
   * @returns Promise containing the found user
   */
  findByEmail(email: string) {
    this.logger.debug(`Finding user by email: ${email}`);
    return this.queryBus.execute(new GetUserByEmailQuery(email));
  }

  /**
   * Creates a new user
   * @param createUserCommand - Command containing the user creation data
   * @returns Promise containing the created user
   */
  create(createUserCommand: CreateUserCommand) {
    this.logger.debug(`Creating user: ${JSON.stringify(createUserCommand)}`);
    return this.commandBus.execute(createUserCommand);
  }

  /**
   * Updates an existing user
   * @param updateUserCommand - Command containing the user update data
   * @returns Promise containing the updated user
   */
  update(updateUserCommand: UpdateUserCommand) {
    this.logger.debug(`Updating user: ${JSON.stringify(updateUserCommand)}`);
    return this.commandBus.execute(updateUserCommand);
  }

  /**
   * Removes a user from the system
   * @param deleteUserCommand - Command containing the user deletion data
   * @returns Promise indicating deletion success
   */
  remove(deleteUserCommand: DeleteUserCommand) {
    this.logger.debug(`Removing user: ${JSON.stringify(deleteUserCommand)}`);
    return this.commandBus.execute(deleteUserCommand);
  }
}
