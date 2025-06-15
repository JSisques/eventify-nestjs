import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserUpdatedEvent } from 'src/users/domain/events/user-updated.event';
import { UserCacheRepository } from '../ports/user-cache.repository';

/**
 * Event handler for processing user updated events
 */
@EventsHandler(UserUpdatedEvent)
export class UserUpdatedEventHandler
  implements IEventHandler<UserUpdatedEvent>
{
  private readonly logger = new Logger(UserUpdatedEventHandler.name);

  /**
   * Creates a new UserUpdatedEventHandler instance
   */
  constructor(private readonly userCacheRepository: UserCacheRepository) {}

  /**
   * Handles the user updated event
   * @param event The user updated event containing the updated user details
   * @returns A promise that resolves when the event has been handled
   */
  async handle(event: UserUpdatedEvent): Promise<void> {
    this.userCacheRepository.setUser(event.user);
  }
}
