import { IUser } from '../interfaces/user.interface';

export class User {
  constructor(private readonly attributes: IUser) {}

  static create(attributes: IUser): User {
    return new User(attributes);
  }

  static fromPrimitives(attributes: IUser): User {
    return new User(attributes);
  }

  toPrimitives(): IUser {
    return this.attributes;
  }
}
