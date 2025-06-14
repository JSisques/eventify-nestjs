export class UserNotFoundException extends Error {
  constructor(
    message: string,
    public readonly userId: string,
  ) {
    super(message);
    this.name = 'UserNotFoundException';
    this.userId = userId;
  }
}
