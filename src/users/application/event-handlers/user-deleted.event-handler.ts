import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'src/users/domain/events/user-created.event';
import { Logger } from '@nestjs/common';
import { UserDeletedEvent } from 'src/users/domain/events/user-deleted.event';

/**
 * Event handler for processing user deleted events
 */
@EventsHandler(UserDeletedEvent)
export class UserDeletedEventHandler
  implements IEventHandler<UserDeletedEvent>
{
  private readonly logger = new Logger(UserDeletedEventHandler.name);

  /**
   * Creates a new UserDeletedEventHandler instance
   */
  constructor() {}

  /**
   * Handles the user deleted event
   * @param event The user deleted event containing the deleted user details
   * @returns A promise that resolves when the event has been handled
   */
  async handle(event: UserDeletedEvent): Promise<void> {
    this.logger.debug(
      `Processing user deleted event: ${JSON.stringify(event)}`,
    );
  }
}
