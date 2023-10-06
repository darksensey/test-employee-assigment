import { Module } from '@nestjs/common';
import { EmployeeController } from "./employee.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "../enteties/employee.entity";
import { EmployeeService } from "./employee.service";

@Module({
  controllers: [EmployeeController],
  imports: [
    TypeOrmModule.forFeature([
      Employee
    ]),
  ],
  providers: [EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule {
}
