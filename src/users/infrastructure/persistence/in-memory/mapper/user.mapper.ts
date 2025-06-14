import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { UserPassword } from 'src/users/domain/value-objects/user-password';
import { UserEmail } from 'src/users/domain/value-objects/user-email';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return User.fromPrimitives(entity);
  }

  static toPersistence(user: User): UserEntity {
    return user.toPrimitives();
  }
}
