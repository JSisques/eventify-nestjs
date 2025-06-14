import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { User } from 'src/users/domain/user';
import { Logger } from '@nestjs/common';
import { UserRepository } from '../ports/user.repository';

/**
 * Query handler for retrieving a user by their email address
 */
@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  private readonly logger = new Logger(GetUserByEmailQueryHandler.name);

  /**
   * Creates a new GetUserByEmailQueryHandler instance
   * @param userRepository The repository for accessing user data
   */
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Executes the get user by email query to retrieve a specific user
   * @param query The query containing the email to look up
   * @returns A promise that resolves to the requested user
   */
  async execute(query: GetUserByEmailQuery): Promise<User> {
    this.logger.debug('Executing get user by email query');
    return this.userRepository.findByEmail(query.email);
  }
}
