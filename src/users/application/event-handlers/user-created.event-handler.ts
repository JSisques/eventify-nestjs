import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'src/users/domain/events/user-created.event';
import { UserRepository } from '../ports/user.repository';
import { Logger } from '@nestjs/common';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  private readonly logger = new Logger(UserCreatedEventHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    this.logger.debug(
      `Processing user created event: ${JSON.stringify(event)}`,
    );
  }
}
