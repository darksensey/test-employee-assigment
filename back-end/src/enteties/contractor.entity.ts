// FIXME find a way to avoid no-cycle error
/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
} from "typeorm";
import {BaseEntity} from "./base.entity";
import { Assigment, ConnectableType } from "./assigment.entity";

@Entity('contractor')
export class Contractor extends BaseEntity {
  @Column()
  name: string;

  @Column()
  salary: number;

  @Column({default: 0, type: 'decimal', precision: 10, scale: 2})
  total: number;

  // this column exist just because typeorm doesn't support polymorphic relations and
  // I want to join assigment table with additional condition
  @Column()
  connectableType: ConnectableType = ConnectableType.CONTRACTOR;

  @OneToMany(() => Assigment, (assigment) => assigment.contractor)
  @JoinColumn([
    { name: 'id', referencedColumnName: 'connectableId' },
    { name: 'connectableType', referencedColumnName: 'connectableType' }
  ])
  assigment: Assigment[];
}