/**
 * Represents the primitive values that make up a User entity
 * @typedef {Object} UserPrimitives
 * @property {string} id - The unique identifier of the user
 * @property {string} name - The name of the user
 * @property {string} email - The email address of the user
 * @property {string} password - The hashed password of the user
 */
export type UserPrimitives = {
  id: string;
  name: string;
  email: string;
  password: string;
};
