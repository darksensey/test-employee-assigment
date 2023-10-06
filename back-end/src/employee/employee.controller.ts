import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { Employee } from "../enteties/employee.entity";

@Controller()
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Get()
  async getMany(): Promise<Employee[]> {
    return this.service.getMany();
  }

  @Get(':id')
  async getOne(@Param('id', new ParseIntPipe()) id: number): Promise<Employee> {
    return this.service.getOne(id);
  }

  @Post()
  async create(@Body() body: Employee): Promise<Employee> {
    return this.service.create(body);
  }
}
