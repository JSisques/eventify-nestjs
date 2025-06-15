import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return User.fromPrimitives(entity);
  }

  static toPersistence(user: User): UserEntity {
    return user.toPrimitives();
  }
}
