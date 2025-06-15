import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';

async function bootstrap() {
  const logger = new Logger('Main');

  const options: ApplicationBootstrapOptions = {
    driver: 'in-memory',
    cacheDriver: 'in-memory',
  };

  const app = await NestFactory.create(AppModule.register(options));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Server is running on port ${port}`);
}
bootstrap();
