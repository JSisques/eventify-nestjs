import { User } from '../user';

/**
 * Event emitted when a new user is created
 */
export class UserUpdatedEvent {
  /**
   * @param user The updser instance
   */
  constructor(public readonly user: User) {}
}
