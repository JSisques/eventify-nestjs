import { Module } from '@nestjs/common';
import { InMemoryPersistanceModule } from './persistence/in-memory/in-memory-persistance.module';
import { InMemoryCacheModule } from './cache/in-memory/in-memory-cache.module';

@Module({})
export class UsersInfrastructureModule {
  static use(driver: 'in-memory', cacheDriver: 'in-memory' | 'redis') {
    let persistenceModule;
    switch (driver) {
      case 'in-memory':
        persistenceModule = InMemoryPersistanceModule;
        break;
      default:
        persistenceModule = InMemoryPersistanceModule;
    }

    let cacheModule;
    switch (cacheDriver) {
      case 'in-memory':
        cacheModule = InMemoryCacheModule;
        break;
      default:
        cacheModule = InMemoryCacheModule;
    }

    return {
      module: UsersInfrastructureModule,
      imports: [persistenceModule, cacheModule],
      exports: [persistenceModule, cacheModule],
    };
  }
}
