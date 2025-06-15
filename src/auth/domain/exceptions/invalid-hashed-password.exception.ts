export class InvalidHashedPasswordException extends Error {
  constructor(value: string) {
    super(`Invalid hashed password: ${value}`);
    this.name = 'InvalidHashedPasswordException';
    this.message = `Invalid hashed password: ${value}`;
  }
}
