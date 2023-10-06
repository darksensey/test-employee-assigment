import { Routes } from 'nest-router';
import { EmployeeModule } from "./employee/employee.module";
import { AssigmentModule } from "./assigment/assigment.module";
import { ContractorModule } from "./contractor/contractor.module";

export const routes: Routes = [
  {
    path: '/employee',
    module: EmployeeModule,
  },
  {
    path: '/assigment',
    module: AssigmentModule,
  },
  {
    path: '/contractor',
    module: ContractorModule,
  }
];
