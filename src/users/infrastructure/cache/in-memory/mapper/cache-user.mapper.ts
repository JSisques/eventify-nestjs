import { User } from 'src/users/domain/user';
import { CacheUserEntity } from '../entities/cache-user.entity';

export class CacheUserMapper {
  static toDomain(entity: CacheUserEntity): User {
    return User.fromPrimitives(entity);
  }

  static toPersistence(user: User): CacheUserEntity {
    return user.toPrimitives();
  }
}
