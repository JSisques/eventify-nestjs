import { Controller, Post } from '@nestjs/common';
import { CreateUserService } from 'src/users/application/services/create-user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Body } from '@nestjs/common';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute({
      name: createUserDto.name,
    });
  }
}
