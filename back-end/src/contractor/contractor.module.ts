import { Module } from '@nestjs/common';
import { ContractorController } from "./contractor.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractorService } from "./contractor.service";
import { Contractor } from "../enteties/contractor.entity";

@Module({
  controllers: [ContractorController],
  imports: [
    TypeOrmModule.forFeature([
      Contractor
    ]),
  ],
  providers: [ContractorService],
  exports: [ContractorService]
})
export class ContractorModule {
}
