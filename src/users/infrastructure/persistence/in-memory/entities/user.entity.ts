/**
 * Entity class representing a User in the in-memory persistence layer
 */
export class UserEntity {
  /** Unique identifier of the user */
  id: string;
  /** Name of the user */
  name: string;
  /** Email address of the user */
  email: string;
  /** Hashed password of the user */
  password: string;
}
