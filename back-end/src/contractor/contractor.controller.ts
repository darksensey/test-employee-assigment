import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ContractorService } from "./contractor.service";
import { Contractor } from "../enteties/contractor.entity";

@Controller()
export class ContractorController {
  constructor(private readonly service: ContractorService) {}

  @Get()
  async getMany(): Promise<Contractor[]> {
    return this.service.getMany();
  }

  @Get(':id')
  async getOne(@Param('id', new ParseIntPipe()) id: number): Promise<Contractor> {
    return this.service.getOne(id);
  }

  @Post()
  async create(@Body() body: Contractor): Promise<Contractor> {
    return this.service.create(body);
  }
}
