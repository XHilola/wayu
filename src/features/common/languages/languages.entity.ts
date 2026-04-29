import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';

@Entity('languages')
export class Languages extends BaseModel {
  @Column({ length: 64 })
  title!: string;
}
