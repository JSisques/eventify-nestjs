import { User } from '../user';

/**
 * Event emitted when a new user is created
 */
export class UserDeletedEvent {
  /**
   * @param user The deleted user instance
   */
  constructor(public readonly user: User) {}
}
