import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';

/**
 * Mapper class responsible for transforming between User domain objects and UserEntity persistence objects.
 */
export class UserMapper {
  /**
   * Converts a UserEntity from the persistence layer to a User domain object
   * @param entity - The UserEntity to convert
   * @returns A User domain object
   */
  static toDomain(entity: UserEntity): User {
    return User.fromPrimitives(entity);
  }

  /**
   * Converts a User domain object to a UserEntity for persistence
   * @param user - The User domain object to convert
   * @returns A UserEntity for persistence
   */
  static toPersistence(user: User): UserEntity {
    return user.toPrimitives();
  }
}
