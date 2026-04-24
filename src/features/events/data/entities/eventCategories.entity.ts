import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { Events } from './events.entity';

@Entity('eventCategories')
export class EventCategories extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(() => Events, (a) => a.category)
  events?: Events[];
}
