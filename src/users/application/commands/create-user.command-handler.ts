import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from '../ports/user.repository';
import { UserFactory } from 'src/users/domain/factories/user.factory';
import { Logger } from '@nestjs/common';
import { UserCreatedEvent } from 'src/users/domain/events/user-created.event';
import { User } from 'src/users/domain/user';

/**
 * Command handler for creating a new user
 */
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  private readonly logger = new Logger(CreateUserCommandHandler.name);

  /**
   * Creates a new CreateUserCommandHandler instance
   * @param userRepository Repository for user operations
   * @param userFactory Factory for creating user domain objects
   * @param eventBus Event bus for publishing domain events
   */
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * Executes the create user command
   * @param command The create user command containing user details
   * @returns The created user
   */
  async execute(command: CreateUserCommand): Promise<User> {
    this.logger.debug(
      `Processing create user command: ${JSON.stringify(command)}`,
    );

    const user = this.userFactory.create(
      command.user.name,
      command.user.email,
      command.user.password,
    );

    const createdUser = await this.userRepository.create(user);
    this.logger.debug(`Created user: ${JSON.stringify(createdUser)}`);

    this.eventBus.publish(new UserCreatedEvent(createdUser));
    this.logger.debug('User created event published');

    return createdUser;
  }
}
