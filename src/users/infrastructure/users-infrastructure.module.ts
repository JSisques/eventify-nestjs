import { Module } from '@nestjs/common';
import { InMemoryPersistanceModule } from './persistence/in-memory/in-memory-persistance.module';

@Module({})
export class UsersInfrastructureModule {
  static use(driver: 'in-memory') {
    let persistenceModule;
    switch (driver) {
      case 'in-memory':
        persistenceModule = InMemoryPersistanceModule;
        break;
      default:
        persistenceModule = InMemoryPersistanceModule;
    }

    return {
      module: UsersInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
