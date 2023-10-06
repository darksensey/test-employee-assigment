/* eslint-disable import/no-cycle */
import {Column, Entity, JoinColumn, OneToMany} from "typeorm";
import { BaseEntity } from "./base.entity";
import { Assigment, ConnectableType } from "./assigment.entity";

@Entity('employee')
export class Employee extends BaseEntity {
  @Column() name: string;

  @Column() salary: number;

  @Column({default: 0, type: 'decimal', precision: 10, scale: 2})
  total?: number;

  // this column exist just because typeorm doesn't support polymorphic relations and
  // I want to join assigment table with additional condition
  @Column()
  connectableType?: ConnectableType = ConnectableType.EMPLOYEE;

  @OneToMany(() => Assigment, (assigment) => assigment.employee)
  @JoinColumn([
    { name: 'id', referencedColumnName: 'connectableId' },
    { name: 'connectableType', referencedColumnName: 'connectableType' }
  ])
  assigment?: Assigment[];

  recalculateTotal() {
    console.log('recalculateTotal', this.assigment);
    const total = this.assigment?.reduce((acc, assignment) => acc + assignment.total, 0);
    this.total = total || this.total;
  }
}