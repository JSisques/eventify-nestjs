import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: CreateUserDto): Promise<User> {
    const userEntity = User.create(user);
    await this.userRepository.create(userEntity);
    return userEntity;
  }
}
