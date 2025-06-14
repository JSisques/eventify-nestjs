export class UserAlreadyExistsException extends Error {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = UserAlreadyExistsException.name;
    this.message = `User with email ${email} already exists`;
  }
}
