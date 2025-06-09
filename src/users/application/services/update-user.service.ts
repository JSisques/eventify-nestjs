import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: UpdateUserDto): Promise<User> {
    const userEntity = User.create(user.toPrimitives());
    await this.userRepository.update(userEntity);
    return userEntity;
  }
}
