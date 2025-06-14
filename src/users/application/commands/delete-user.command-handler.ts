import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';
import { UserRepository } from '../ports/user.repository';
import { Logger } from '@nestjs/common';
import { User } from 'src/users/domain/user';
import { UserDeletedEvent } from 'src/users/domain/events/user-deleted.event';

/**
 * Command handler for deleting a user
 */
@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  private readonly logger = new Logger(DeleteUserCommandHandler.name);

  /**
   * Creates a new DeleteUserCommandHandler instance
   * @param userRepository Repository for user operations
   * @param eventBus Event bus for publishing domain events
   */
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * Executes the delete user command
   * @param command The delete user command containing the user ID
   * @returns The deleted user
   */
  async execute(command: DeleteUserCommand): Promise<User> {
    this.logger.debug(
      `Processing delete user command: ${JSON.stringify(command)}`,
    );
    const deletedUser = await this.userRepository.delete(command.id);
    this.logger.debug(`Deleted user: ${command.id}`);

    this.eventBus.publish(new UserDeletedEvent(deletedUser));
    this.logger.debug('User deleted event published');

    return deletedUser;
  }
}
