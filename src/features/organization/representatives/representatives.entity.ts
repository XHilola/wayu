import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import type { Branches } from '../branches/branches.entity'; // type-only

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

  @OneToMany(
    () => require('../branches/branches.entity').Branches,
    (a: Branches) => a.representative,
  )
  branches?: Branches[];
}