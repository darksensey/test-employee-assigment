// FIXME find a way to avoid no-cycle error
/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from "typeorm";
import {BaseEntity} from "./base.entity";
import {Employee} from "./employee.entity";
import {Contractor} from "./contractor.entity";
import {Project} from "./project.entity";
import { IsInt, Min, Max, IsEnum } from "class-validator";
import { EmployeeService } from "../employee/employee.service";

export enum ConnectableType {
  EMPLOYEE = 'employee',
  CONTRACTOR = 'contractor'
}

@Entity('assigment')
export class Assigment extends BaseEntity {
  constructor(private employeeService: EmployeeService) {
    super();
  }

  @Column()
  @IsInt()
  months: number;

  @Column()
  @IsInt()
  connectableId: number;

  @Column()
  @IsEnum(ConnectableType)
  connectableType: ConnectableType;

  @Column()
  @IsInt()
  projectId: number;

  @Column()
  @IsInt()
  @Min(1)
  @Max(100)
  rnDPercentage: number;

  @Column({default: 0, type: 'decimal', precision: 10, scale: 2})
  @IsInt()
  total?: number;

  @ManyToOne(() => Project, (project) => project.assigment)
  project?: Project;

  // typeorm doesn't support polymorphic relations. we have to specify one more condition when we want to get data
  @ManyToOne(() => Contractor, (contractor) => contractor.assigment)
  @JoinColumn([
    { name: 'connectableId', referencedColumnName: 'id' },
    { name: 'connectableType', referencedColumnName: 'connectableType' }
  ])
  contractor?: Contractor;

  @ManyToOne(() => Employee, (employee) => employee.assigment)
  @JoinColumn([
    { name: 'connectableId', referencedColumnName: 'id' },
    { name: 'connectableType', referencedColumnName: 'connectableType' }
  ])
  employee?: Employee;
}