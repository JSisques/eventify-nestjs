/**
 * Command to create a new user
 */
export class CreateUserCommand {
  /**
   * Creates a new CreateUserCommand instance
   * @param name The name of the user
   * @param email The email of the user
   * @param password The password of the user
   */
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
