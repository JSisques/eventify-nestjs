import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from '../ports/user.repository';
import { UserFactory } from 'src/users/domain/factories/user.factory';
import { Logger } from '@nestjs/common';
import { UserCreatedEvent } from 'src/users/domain/events/user-created.event';
import { User } from 'src/users/domain/user';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  private readonly logger = new Logger(CreateUserCommandHandler.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    this.logger.debug(
      `Processing create user command: ${JSON.stringify(command)}`,
    );

    const user = this.userFactory.create(
      command.name,
      command.email,
      command.password,
    );

    const createdUser = await this.userRepository.create(user);
    this.logger.debug(`Created user: ${JSON.stringify(createdUser)}`);

    this.eventBus.publish(new UserCreatedEvent(createdUser));
    this.logger.debug('User created event published');

    return createdUser;
  }
}
