import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConnectableType } from "../enteties/assigment.entity";
import { Contractor } from "../enteties/contractor.entity";

@Injectable()
export class ContractorService {
  constructor(@InjectRepository(Contractor) private readonly repository: Repository<Contractor>) {
  }

  async getMany(): Promise<Contractor[]> {
    return this.repository.find({
      relations: ['assigment']
    });
  }

  async getOne(id: number): Promise<Contractor> {
    const contractor = await this.repository.findOne({
      relations: ['assigment'],
      where: {
        id: id
      }
    });

    // if contractor is not found, throw an error with statusCode 404
    if (!contractor) {
      throw new NotFoundException(`Contractor with id: ${id} not found`);
    }

    return contractor;
  }

  async create(createDto: Partial<Contractor>): Promise<Contractor> {
    const contractor = await this.repository.create({
      ...createDto,
      connectableType: ConnectableType.CONTRACTOR // redefine connectableType to make sure that it is CONTRACTOR
    })
    return this.repository.save(contractor);
  }
}
