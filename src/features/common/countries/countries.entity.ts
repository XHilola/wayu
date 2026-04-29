import { Column, Entity, OneToMany } from 'typeorm';
import { Branches } from '../../organization/entities/branches.entity';
import { BaseModel } from '../../../core/basemodel';

@Entity('countries')
export class Countries extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;

  @Column({ length: 128 })
  flag!: string;

  @OneToMany(() => Branches, (a) => a.country)
  branches?: Branches[];
}
