import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormConfig from '../config/orm.config';
import { MigrationService } from './migration.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(ormConfig)],
      useFactory: (config: ConfigService) => {
        return {
          ...config.get('orm')
        };
      },
      inject: [ConfigService],
    })
  ],
  providers: [
    MigrationService,
  ],
  exports: [MigrationService]
})
export class MigrationModule {}
