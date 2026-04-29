import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import { questionStatus } from '../../../core/enums/questionStatus.enum';

@Entity('questions')
export class Questions extends BaseModel {

  @Column({ length: 64 })
  fullName!: string;

  @Column({ length: 16 })
  phoneNumber!: string;

  @Column({ length: 2000 })
  question!: string;

  @Column({ type: 'enum', enum: questionStatus, default: questionStatus.pending })
  status!: questionStatus;
}
