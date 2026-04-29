import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';

@Entity('usefulLinks')
export class UsefulLinks extends BaseModel {

  @Column({ length: 128 })
  title!: string;

  @Column({ length: 128 })
  icon!: string;

  @Column({ length: 128 })
  link!: string;
}
