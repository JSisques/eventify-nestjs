import { IQueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/users/domain/user';
import { Logger } from '@nestjs/common';
import { UserRepository } from '../ports/user.repository';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  private readonly logger = new Logger(GetUsersQueryHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUsersQuery): Promise<User[]> {
    this.logger.debug('Executing get users query');
    return this.userRepository.findAll();
  }
}
