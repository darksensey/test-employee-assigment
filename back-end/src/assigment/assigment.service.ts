import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Assigment, ConnectableType } from "../enteties/assigment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "../enteties/employee.entity";
import { Contractor } from "../enteties/contractor.entity";

@Injectable()
export class AssigmentService {
  constructor(
    @InjectRepository(Assigment) private readonly assigmentRepository: Repository<Assigment>,
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Contractor) private readonly contractorRepository: Repository<Contractor>,
    ) {
  }

  async getMany(): Promise<Assigment[]> {
    return this.assigmentRepository.find({
      relations: ['employee', 'project', 'contractor']
    });
  }

  async getOne(id: number): Promise<Assigment> {
    const assigment = await this.assigmentRepository.findOne({
      relations: ['employee', 'project', 'contractor'],
      where: {
        id: id
      }
    });

    // if assigment is not found, throw an error with statusCode 404
    if (!assigment) {
      throw new NotFoundException(`Assigment with id: ${id} not found`);
    }

    return assigment;
  }

  async create(createDto: Partial<Assigment>): Promise<Assigment> {
    // simple validation to make sure that connectableType and connectableId link to one entity
    let connectable: Employee | Contractor;
    if (createDto.connectableType === ConnectableType.EMPLOYEE) {
      connectable = await this.employeeRepository.findOne({
        where: {
          id: createDto.connectableId
        }
      });

    } else if (createDto.connectableType === ConnectableType.CONTRACTOR) {
      connectable = await this.contractorRepository.findOne({
        where: {
          id: createDto.connectableId
        }
      });
    }

    // if connectable is not found, throw an error with statusCode 400
    if (!connectable) {
      throw new BadRequestException(`${createDto.connectableType} with id: ${createDto.connectableId} not found`);
    }


    return this.assigmentRepository.save(
      this.assigmentRepository.create(createDto)
    );
  }

  async update(id: number, updateDto: Partial<Assigment>): Promise<Assigment> {
    const assigment = await this.assigmentRepository.findOneBy({id});

    if (!assigment) {
      throw new BadRequestException(`Assigment with id: ${id} not found`);
    }

    // I am using this.assigmentRepository.create for Entity hooks like BeforeUpdate
    assigment.months = updateDto.months || assigment.months;
    assigment.rnDPercentage = updateDto.rnDPercentage || assigment.rnDPercentage;

    await this.assigmentRepository.manager.save(assigment);

    return this.getOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.assigmentRepository.softDelete(id);

    return ;
  }

  calculateTotal(assigment: Assigment): number  {
    return (assigment.months * assigment.rnDPercentage) / 12;
  }
}
