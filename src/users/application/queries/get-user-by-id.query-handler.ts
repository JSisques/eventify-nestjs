import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { User } from 'src/users/domain/user';
import { Logger } from '@nestjs/common';
import { UserRepository } from '../ports/user.repository';
import { UserCacheRepository } from '../ports/user-cache.repository';
import { UserNotFoundException } from 'src/users/domain/exceptions/user-not-found.exception';

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
   * @param userCacheRepository The repository for accessing cached user data
   */
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userCacheRepository: UserCacheRepository,
  ) {}

  /**
   * Executes the get user by ID query to retrieve a specific user
   * @param query The query containing the user ID to look up
   * @returns A promise that resolves to the requested user
   */
  async execute(query: GetUserByIdQuery): Promise<User> {
    this.logger.debug(`Executing get user by id query: ${query.id}`);

    this.logger.debug('Checking cached user');
    const cachedUser = await this.userCacheRepository.getUserById(query.id);
    if (cachedUser) return cachedUser;

    this.logger.debug('Fetching from user repository');
    const user = await this.userRepository.findById(query.id);
    if (!user)
      throw new UserNotFoundException(`User with id ${query.id} not found`);

    await this.userCacheRepository.setUser(user);
    return user;
  }
}
