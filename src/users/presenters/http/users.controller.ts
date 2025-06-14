import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { UsersService } from '../../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserCommand } from 'src/users/application/commands/create-user.command';
import { UpdateUserCommand } from 'src/users/application/commands/update-user.command';
import { DeleteUserCommand } from 'src/users/application/commands/delete-user.command';

/**
 * Controller handling HTTP requests for user management
 */
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves all users
   * @returns A list of all users
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Finds a user by their ID
   * @param id - The unique identifier of the user
   * @returns The user with the specified ID
   */
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  /**
   * Finds a user by their email address
   * @param email - The email address to search for
   * @returns The user with the specified email address
   */
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  /**
   * Creates a new user
   * @param createUserDto - The data for creating a new user
   * @returns The newly created user
   */
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

  /**
   * Updates an existing user
   * @param updateUserDto - The data for updating the user
   * @returns The updated user
   */
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(
      new UpdateUserCommand(updateUserDto.id, {
        name: updateUserDto.name,
        email: updateUserDto.email,
      }),
    );
  }

  /**
   * Removes a user
   * @param id - The ID of the user to remove
   * @returns The result of the removal operation
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(new DeleteUserCommand(id));
  }
}
