import { Injectable, OnModuleInit } from "@nestjs/common";
import { EmployeeService } from "./employee/employee.service";
import { ContractorService } from "./contractor/contractor.service";
import { DataSource } from "typeorm";
import { Project } from "./enteties/project.entity";
import { Assigment } from "./enteties/assigment.entity";
import { AssigmentService } from "./assigment/assigment.service";

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly contractorService: ContractorService,
    private readonly assigmentService: AssigmentService,
    private dataSources: DataSource
  ) {}

  // todo just for testing !!!
  // sead data to database
  async onModuleInit() {
    const employees = [];
    const contractors = [];
    const projects = [];

    // create 5 projects
    for (let i = 0; i < 5; i++) {
      const project = await this.dataSources.manager.save(Project, {
        name: `Project ${i}`
      });
      projects.push(project);
    }

    for (let i = 0; i < 10; i++) {
      // create employee
      const employee = await this.employeeService.create({
        name: `Employee ${i}`,
        salary: 3000 + i
      });

      await this.assigmentService.create({
        months: 12 - i,
        connectableType: employee.connectableType,
        connectableId: employee.id,
        projectId: projects[i % 5].id,
        rnDPercentage: 10 + i
      });

      // create contractor
      const contractor = await this.contractorService.create({
        name: `Contractor ${i}`,
        salary: 4000 + i
      });

      await this.assigmentService.create({
        months: 12 - 1,
        connectableType: contractor.connectableType,
        connectableId: contractor.id,
        projectId: projects[i % 5].id,
        rnDPercentage: 40 + i
      });

      contractors.push(contractor);
      employees.push(employee);
    }

    console.log('employees', employees);
    console.log('contractors', contractors);

  }
}
