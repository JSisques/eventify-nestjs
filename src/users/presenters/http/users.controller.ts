import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserCommand } from 'src/users/application/commands/create-user.command';
import { UpdateUserCommand } from 'src/users/application/commands/update-user.command';
import { DeleteUserCommand } from 'src/users/application/commands/delete-user.command';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(
      new CreateUserCommand({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      }),
    );
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(
      new UpdateUserCommand(updateUserDto.id, {
        name: updateUserDto.name,
        email: updateUserDto.email,
      }),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(new DeleteUserCommand(id));
  }
}
