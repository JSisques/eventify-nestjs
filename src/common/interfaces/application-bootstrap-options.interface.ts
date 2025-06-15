/**
 * Interface defining options for bootstrapping the application
 */
export interface ApplicationBootstrapOptions {
  /**
   * The storage driver to use for the application
   * @type {'in-memory'} - Currently only supports in-memory storage
   */
  driver: 'in-memory' | 'type-orm';
  cacheDriver: 'in-memory' | 'noop' | 'redis';
}
