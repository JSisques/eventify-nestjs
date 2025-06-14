import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'src/users/domain/events/user-created.event';
import { Logger } from '@nestjs/common';

/**
 * Event handler for processing user created events
 */
@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  private readonly logger = new Logger(UserCreatedEventHandler.name);

  /**
   * Creates a new UserCreatedEventHandler instance
   */
  constructor() {}

  /**
   * Handles the user created event
   * @param event The user created event containing the created user details
   */
  async handle(event: UserCreatedEvent): Promise<void> {
    this.logger.debug(
      `Processing user created event: ${JSON.stringify(event)}`,
    );
  }
}
