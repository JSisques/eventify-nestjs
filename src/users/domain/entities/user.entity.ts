import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../interfaces/user.interface';

export class User {
  constructor(private readonly attributes: IUser) {}

  static create(attributes: Omit<IUser, 'id'>): User {
    return new User({
      id: uuidv4(),
      ...attributes,
    });
  }

  static fromPrimitives(attributes: IUser): User {
    return new User(attributes);
  }

  toPrimitives(): IUser {
    return this.attributes;
  }
}
