import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { User } from 'src/users/domain/user';
import { Logger } from '@nestjs/common';
import { UserRepository } from '../ports/user.repository';
import { UserCacheRepository } from '../ports/user-cache.repository';
import { UserNotFoundException } from 'src/users/domain/exceptions/user-not-found.exception';

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
   * @param userCacheRepository The repository for accessing cached user data
   */
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userCacheRepository: UserCacheRepository,
  ) {}

  /**
   * Executes the get user by email query to retrieve a specific user
   * @param query The query containing the email to look up
   * @returns A promise that resolves to the requested user
   */
  async execute(query: GetUserByEmailQuery): Promise<User> {
    this.logger.debug(`Executing get user by email query: ${query.email}`);

    this.logger.debug('Checking cached user');
    const cachedUser = await this.userCacheRepository.getUserByEmail(
      query.email,
    );
    if (cachedUser) return cachedUser;

    this.logger.debug('Fetching from user repository');
    const user = await this.userRepository.findByEmail(query.email);

    if (!user)
      throw new UserNotFoundException(
        `User with email ${query.email} not found`,
      );

    await this.userCacheRepository.setUser(user);
    return user;
  }
}
