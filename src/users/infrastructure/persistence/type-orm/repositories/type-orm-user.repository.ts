import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { User } from 'src/users/domain/user';
import { TypeORMUserMapper } from '../mapper/type-orm-user.mapper';
import { TypeORMUserEntity } from '../entities/type-orm-user.entity';

/**
 * TypeORM implementation of the UserRepository interface.
 * Handles persistence of user data in a PostgreSQL database using TypeORM.
 */
@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  private readonly logger = new Logger(TypeOrmUserRepository.name);
  private readonly users: Map<string, TypeORMUserEntity> = new Map<
    string,
    TypeORMUserEntity
  >();

  /**
   * Retrieves all users from the in-memory storage
   * @returns Promise resolving to an array of User objects
   */
  async findAll(): Promise<User[]> {
    this.logger.debug('Finding all users');
    const entities = Array.from(this.users.values());
    this.logger.debug(`Found ${entities.length} users`);

    return entities.map((entity) => TypeORMUserMapper.toDomain(entity));
  }

  /**
   * Finds a user by their ID
   * @param id - The unique identifier of the user
   * @returns Promise resolving to the User if found, null otherwise
   */
  async findById(id: string): Promise<User | null> {
    this.logger.debug(`Finding user by id: ${id}`);
    const entity = this.users.get(id);
    return entity ? TypeORMUserMapper.toDomain(entity) : null;
  }

  /**
   * Finds a user by their email address
   * @param email - The email address of the user
   * @returns Promise resolving to the User if found, null otherwise
   */
  async findByEmail(email: string): Promise<User | null> {
    this.logger.debug(`Finding user by email: ${email}`);
    const entity = Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
    return entity ? TypeORMUserMapper.toDomain(entity) : null;
  }

  /**
   * Creates a new user in the in-memory storage
   * @param user - The user object to create
   * @returns Promise resolving to the created User
   */
  async create(user: User): Promise<User> {
    this.logger.debug(`Creating user: ${JSON.stringify(user)}`);
    const entity = TypeORMUserMapper.toPersistence(user);
    this.users.set(entity.id, entity);

    const newUser = this.users.get(entity.id);
    this.logger.debug(`Created user: ${newUser}`);

    return TypeORMUserMapper.toDomain(newUser);
  }

  /**
   * Updates an existing user in the in-memory storage
   * @param user - The user object with updated data
   * @returns Promise resolving to the updated User
   */
  async update(user: User): Promise<User> {
    this.logger.debug(`Updating user: ${JSON.stringify(user)}`);

    const entity = TypeORMUserMapper.toPersistence(user);
    this.users.set(entity.id, entity);

    const updatedUser = this.users.get(entity.id);
    this.logger.debug(`Updated user: ${JSON.stringify(updatedUser)}`);

    return TypeORMUserMapper.toDomain(updatedUser);
  }

  /**
   * Deletes a user from the in-memory storage
   * @param user - The user object to delete
   * @returns Promise resolving to the deleted User
   */
  async delete(user: User): Promise<User> {
    this.logger.debug(`Deleting user: ${JSON.stringify(user)}`);

    const entity = TypeORMUserMapper.toPersistence(user);
    this.users.delete(entity.id);

    return TypeORMUserMapper.toDomain(entity);
  }
}
