import { Module } from '@nestjs/common';
import { InMemoryPersistanceModule } from './persistence/in-memory/in-memory-persistance.module';
import { InMemoryCacheModule } from './cache/in-memory/in-memory-cache.module';
import { NoopCacheModule } from './cache/noop/noop-cache.module';
import { RedisCacheModule } from './cache/redis/redis-cache.module';
import { TypeORMPersistanceModule } from './persistence/type-orm/type-orm-persistance.module';

@Module({})
export class UsersInfrastructureModule {
  static use(
    driver: 'in-memory' | 'type-orm',
    cacheDriver: 'in-memory' | 'noop' | 'redis',
  ) {
    let persistenceModule;
    switch (driver) {
      case 'in-memory':
        persistenceModule = InMemoryPersistanceModule;
        break;
      case 'type-orm':
        persistenceModule = TypeORMPersistanceModule;
        break;
      default:
        persistenceModule = InMemoryPersistanceModule;
    }

    let cacheModule;
    switch (cacheDriver) {
      case 'in-memory':
        cacheModule = InMemoryCacheModule;
        break;
      case 'noop':
        cacheModule = NoopCacheModule;
        break;
      case 'redis':
        cacheModule = RedisCacheModule;
        break;
      default:
        cacheModule = NoopCacheModule;
    }

    return {
      module: UsersInfrastructureModule,
      imports: [persistenceModule, cacheModule],
      exports: [persistenceModule, cacheModule],
    };
  }
}
