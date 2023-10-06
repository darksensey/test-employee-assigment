import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { EmployeeModule } from './employee/employee.module';
import { AssigmentModule } from './assigment/assigment.module';
import { RouterModule } from "nest-router";
import { routes } from "./routes";
import { ContractorModule } from "./contractor/contractor.module";
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(ormConfig)],
      useFactory: (config: ConfigService) => config.get('orm'),
      inject: [ConfigService],
    }),
    EmployeeModule,
    AssigmentModule,
    ContractorModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
