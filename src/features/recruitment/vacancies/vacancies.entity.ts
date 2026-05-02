import { Column, Entity, OneToMany } from 'typeorm';
import type { Applications } from '../applications/applications.entity';
import { BaseModel } from '../../../core/basemodel';
import { vacancyType } from '../../../core/enums/vacancyType.enum';

@Entity('vacancies')
export class Vacancies extends BaseModel {

  @Column({ length: 256 })
  title!: string;

  @Column({ length: 128 })
  address!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ length: 16 })
  phoneNumber!: string;

  @Column({ type: 'enum', enum: vacancyType })
  type!: vacancyType;

  @Column({ length: 64 })
  salary!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(
    () => require('../applications/applications.entity').Applications,
    (a: Applications) => a.vacancy,
  )
  applications?: Applications[];
}