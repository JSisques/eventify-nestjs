import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { User } from 'src/users/domain/user';
import { Logger } from '@nestjs/common';
import { UserRepository } from '../ports/user.repository';

/**
 * Query handler for retrieving a user by their ID
 */
@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  private readonly logger = new Logger(GetUserByIdQueryHandler.name);

  /**
   * Creates a new GetUserByIdQueryHandler instance
   * @param userRepository The repository for accessing user data
   */
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Executes the get user by ID query to retrieve a specific user
   * @param query The query containing the user ID to look up
   * @returns A promise that resolves to the requested user
   */
  async execute(query: GetUserByIdQuery): Promise<User> {
    this.logger.debug('Executing get user by id query');
    return this.userRepository.findById(query.id);
  }
}
