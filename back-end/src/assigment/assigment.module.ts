import { Module } from '@nestjs/common';
import { AssigmentController } from "./assigment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contractor } from "../enteties/contractor.entity";
import { Employee } from "../enteties/employee.entity";
import { Project } from "../enteties/project.entity";
import { Assigment } from "../enteties/assigment.entity";
import { AssigmentService } from "./assigment.service";
import { AssigmentSubscriberService } from "./assigment.subscriber.service";
import { EmployeeModule } from "../employee/employee.module";

@Module({
  controllers: [AssigmentController],
  imports: [
    TypeOrmModule.forFeature([
      Employee, Contractor, Project, Assigment
    ]),
    EmployeeModule
  ],
  providers: [AssigmentService, AssigmentSubscriberService],
  exports: [AssigmentService]
})
export class AssigmentModule {}
