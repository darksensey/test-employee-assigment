import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Employee } from "../enteties/employee.entity";
import { ConnectableType } from "../enteties/assigment.entity";

@Injectable()
export class EmployeeService {
  constructor(@InjectRepository(Employee) private readonly repository: Repository<Employee>) {
  }

  async getMany(): Promise<Employee[]> {
    return this.repository.find({
      relations: ['assigment']
    });
  }

  async getOne(id: number): Promise<Employee> {
    const employee = await this.repository.findOne({
      relations: ['assigment'],
      where: {
        id: id
      }
    });

    // if employee is not found, throw an error with statusCode 404
    if (!employee) {
      throw new NotFoundException(`Assigment with id: ${id} not found`);
    }

    return employee;
  }

  async update(employee: Partial<Employee>): Promise<Employee> {
    const employeeToUpdate = await this.repository.findOne({
      where: {
        id: employee.id
      }
    });

    if (!employeeToUpdate) {
      throw new BadRequestException(`Employee with id: ${employee.id} not found`);
    }

    return this.repository.save(this.repository.create(employeeToUpdate));
  }

  async create(createDto: Partial<Employee>): Promise<Employee> {
    const employee = this.repository.create({
      ...createDto,
      connectableType: ConnectableType.EMPLOYEE // redefine connectableType to make sure that it is EMPLOYEE
    });
    return this.repository.save(employee);
  }

  async recalculateTotal(id: number, manager?: EntityManager): Promise<void> {
    // in case it before update hook
    manager = manager || this.repository.manager;

    // find employee
    // const employee = await manager.findOne(Employee, {
    //   relations: ['assigment'],
    //   where: {
    //     id: id
    //   }
    // }) as Employee;
    //
    // if (!employee) {
    //   throw new NotFoundException(`Employee with id: ${id} not found`);
    // }
    //
    // employee.total = employee.assigment?.reduce((acc, assignment) => acc + assignment.total, 0);
    // await this.update({
    //   id: employee.id,
    // });

    return ;
  }
}
