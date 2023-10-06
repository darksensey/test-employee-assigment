import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { AssigmentService } from "./assigment.service";
import { Assigment } from "../enteties/assigment.entity";

@Controller()
export class AssigmentController {
  constructor(private readonly service: AssigmentService) {}

  @Get()
  async getMany(): Promise<Assigment[]> {
    return this.service.getMany();
  }

  @Get(':id')
  async getOne(@Param('id', new ParseIntPipe()) id: number): Promise<Assigment> {
    return this.service.getOne(id);
  }

  @Post()
  async create(@Body() body: Assigment): Promise<Assigment> {
    return this.service.create(body);
  }

  @Patch(':id')
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateDto: Partial<Assigment>): Promise<Assigment> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.service.delete(id);
  }
}
