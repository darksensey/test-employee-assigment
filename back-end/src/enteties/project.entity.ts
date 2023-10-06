// FIXME find a way to avoid no-cycle error
/* eslint-disable import/no-cycle */
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
} from "typeorm";
import {Length} from 'class-validator';
import {BaseEntity} from './base.entity'
import {Assigment} from "./assigment.entity";

@Entity('project')
export class Project extends BaseEntity {
  @Column()
  @Length(3, 20)
  name: string;

  @OneToMany(() => Assigment, (assigment) => assigment.project)
  @JoinColumn({ name: 'id', referencedColumnName: 'projectId' })
  assigment: Assigment[];
}