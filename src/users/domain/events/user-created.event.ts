import { User } from '../user';

/**
 * Event emitted when a new user is created
 */
export class UserCreatedEvent {
  /**
   * @param user The newly created user instance
   */
  constructor(public readonly user: User) {}
}
