import { Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { InMemoryPersistanceModule } from 'src/users/infrastructure/persistence/in-memory/in-memory-persistance.module';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    let imports;
    switch (options.driver) {
      case 'in-memory':
        imports = [InMemoryPersistanceModule];
        break;
      default:
        throw new Error(`Unsupported driver: ${options.driver}`);
    }

    return {
      module: CoreModule,
      imports,
    };
  }
}
