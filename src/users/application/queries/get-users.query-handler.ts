import { IQueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/users/domain/user';
import { Logger } from '@nestjs/common';
import { UserRepository } from '../ports/user.repository';

/**
 * Query handler for retrieving all users
 */
@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  private readonly logger = new Logger(GetUsersQueryHandler.name);

  /**
   * Creates a new GetUsersQueryHandler instance
   * @param userRepository The repository for accessing user data
   */
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Executes the get users query to retrieve all users
   * @param query The query parameters (empty in this case)
   * @returns A promise that resolves to an array of users
   */
  async execute(query: GetUsersQuery): Promise<User[]> {
    this.logger.debug('Executing get users query');
    return this.userRepository.findAll();
  }
}
