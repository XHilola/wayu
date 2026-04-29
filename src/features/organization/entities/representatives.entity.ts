import { Column, Entity, OneToMany } from 'typeorm';
import { Branches } from './branches.entity';
import { BaseModel } from '../../../core/basemodel';

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

  @OneToMany(() => Branches, (a) => a.representative)
  branches?: Branches[];
}
