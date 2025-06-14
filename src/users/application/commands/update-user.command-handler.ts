import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { User } from 'src/users/domain/user';
import { Logger } from '@nestjs/common';
import { UserRepository } from '../ports/user.repository';
import { UserNotFoundException } from 'src/users/domain/exceptions/user-not-found.exception';

/**
 * Command handler for updating a user's information
 * @class UpdateUserCommandHandler
 * @implements {ICommandHandler<UpdateUserCommand>}
 */
@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  private readonly logger = new Logger(UpdateUserCommandHandler.name);

  /**
   * Creates a new instance of UpdateUserCommandHandler
   * @param {UserRepository} userRepository - The repository for user operations
   */
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Executes the update user command
   * @param {UpdateUserCommand} command - The command containing user ID and updated data
   * @returns {Promise<User>} A promise that resolves to the updated user
   * @throws {Error} If the user is not found or update fails
   */
  async execute(command: UpdateUserCommand): Promise<User> {
    this.logger.debug('Executing update user command');

    const user = await this.userRepository.findById(command.id);

    if (!user) throw new UserNotFoundException('User not found', command.id);

    return this.userRepository.update(user);
  }
}
