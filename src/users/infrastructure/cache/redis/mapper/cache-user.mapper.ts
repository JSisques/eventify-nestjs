import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/cache-user.entity';

export class CacheUserMapper {
  static toDomain(entity: UserEntity): User {
    return User.fromPrimitives(entity);
  }

  static toPersistence(user: User): UserEntity {
    return user.toPrimitives();
  }
}
