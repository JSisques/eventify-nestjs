import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { InMemoryCacheModule } from 'src/users/infrastructure/cache/in-memory/in-memory-cache.module';
import { NoopCacheModule } from 'src/users/infrastructure/cache/noop/noop-cache.module';
import { RedisCacheModule } from 'src/users/infrastructure/cache/redis/redis-cache.module';
import { InMemoryPersistanceModule } from 'src/users/infrastructure/persistence/in-memory/in-memory-persistance.module';
import { TypeORMPersistanceModule } from 'src/users/infrastructure/persistence/type-orm/type-orm-persistance.module';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    let persistenceModule;
    switch (options.driver) {
      case 'in-memory':
        persistenceModule = InMemoryPersistanceModule;
        break;
      case 'type-orm':
        persistenceModule = TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          autoLoadEntities: process.env.TYPE_ORM_AUTO_LOAD_ENTITIES === 'true',
          synchronize: process.env.TYPE_ORM_SYNCHRONIZE === 'true',
        });
        break;
      default:
        throw new Error(`Unsupported driver: ${options.driver}`);
    }

    let cacheModule;
    switch (options.cacheDriver) {
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
        throw new Error(`Unsupported cache driver: ${options.cacheDriver}`);
    }

    return {
      module: CoreModule,
      imports: [persistenceModule, cacheModule],
    };
  }
}
