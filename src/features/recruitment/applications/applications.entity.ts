import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import { applicationStatus } from '../../../core/enums/applicationStatus.enum';
import  { Vacancies } from '../vacancies/vacancies.entity';
import type {Relation} from 'typeorm';

@Entity('applications')
export class Applications extends BaseModel {

  @Column({ length: 64 })
  fullName!: string;

  @Column({ length: 16 })
  phoneNumber!: string;

  @Column({ length: 64 })
  email!: string;

  @Column()
  vacancyId!: number;

  @Column({ length: 128 })
  resume!: string;

  @Column({ type: 'enum', enum: applicationStatus, default: applicationStatus.active })
  status!: applicationStatus;

  @JoinColumn({ name: 'vacancyId' })
  @ManyToOne(()=>Vacancies,vacancy=>vacancy.applications)
  vacancy?: Relation<Vacancies>;
}