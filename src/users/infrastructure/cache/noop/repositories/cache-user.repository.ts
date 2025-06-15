import { Injectable, Logger } from '@nestjs/common';
import { UserCacheRepository } from 'src/users/application/ports/user-cache.repository';
import { User } from 'src/users/domain/user';

@Injectable()
export class NoopCacheUserRepository implements UserCacheRepository {
  private readonly logger = new Logger(NoopCacheUserRepository.name);

  async getUserById(id: string): Promise<User | null> {
    this.logger.debug(`Getting user by id: ${id}`);
    return null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    this.logger.debug(`Getting user by email: ${email}`);
    return null;
  }

  async setUser(user: User): Promise<void> {
    this.logger.debug(`Setting user: ${user.id}`);
  }

  async deleteUser(id: string): Promise<void> {
    this.logger.debug(`Deleting user: ${id}`);
  }
}
