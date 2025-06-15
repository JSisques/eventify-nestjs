export class InvalidProviderException extends Error {
  constructor(value: string) {
    super(`Invalid provider: ${value}`);
    this.name = 'InvalidProviderException';
    this.message = `Invalid provider: ${value}`;
  }
}
