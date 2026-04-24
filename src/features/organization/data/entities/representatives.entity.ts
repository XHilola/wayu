import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { Branches } from './branches.entity';

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
