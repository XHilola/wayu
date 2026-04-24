import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { vacancyType } from '../enums/vacancyType.enum';
import { Applications } from './applications.entity';

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

  @OneToMany(() => Applications, (a) => a.vacancy)
  applications?: Applications[];
}
