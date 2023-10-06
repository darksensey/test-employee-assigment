import { NestFactory } from '@nestjs/core';
import { MigrationModule } from './migration.module';
import { MigrationService } from './migration.service';

async function bootstrap(): Promise<void> {
  const appContext = await NestFactory.createApplicationContext(MigrationModule);
  const migrationService = appContext.get(MigrationService);

  migrationService.createORMConfigFile();
}
bootstrap();
