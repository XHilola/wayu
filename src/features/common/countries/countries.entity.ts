import { Column, Entity, OneToMany } from 'typeorm';
import type { Branches } from '../../organization/branches/branches.entity';
import { BaseModel } from '../../../core/basemodel';

@Entity('countries')
export class Countries extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @Column({ length: 128 })
  flag!: string;

  @OneToMany(
    () => require('../../organization/branches/branches.entity').Branches,
    (a: Branches) => a.country,
  )
  branches?: Branches[];
}