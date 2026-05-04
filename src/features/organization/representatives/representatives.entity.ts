import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import  { Branches } from '../branches/branches.entity';
import type {Relation} from 'typeorm';

@Entity('representatives')
export class Representatives extends BaseModel {

  @Column({ length: 64 })
  fullName!: string;

  @Column({ length: 128 })
  image!: string;

  @Column({ length: 64 })
  email!: string;

  @Column({ length: 16 })
  phoneNumber!: string;

  @Column({ type: 'text' })
  resume!: string;

  @OneToMany(()=>Branches,branches=>branches.representative)
  branches?: Relation<Branches[]>;
}