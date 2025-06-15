import { User } from 'src/users/domain/user';
import { TypeORMUserEntity } from '../entities/type-orm-user.entity';

/**
 * Mapper class responsible for transforming between User domain objects and UserEntity persistence objects.
 */
export class TypeORMUserMapper {
  /**
   * Converts a UserEntity from the persistence layer to a User domain object
   * @param entity - The UserEntity to convert
   * @returns A User domain object
   */
  static toDomain(entity: TypeORMUserEntity): User {
    return User.fromPrimitives(entity);
  }

  /**
   * Converts a User domain object to a UserEntity for persistence
   * @param user - The User domain object to convert
   * @returns A UserEntity for persistence
   */
  static toPersistence(user: User): TypeORMUserEntity {
    return user.toPrimitives();
  }
}
