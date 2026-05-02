import { Column, Entity, OneToMany } from 'typeorm';
import type { Events } from '../events/events.entity';
import { BaseModel } from '../../../core/basemodel';

@Entity('eventCategories')
export class EventCategories extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(
    () => require('../events/events.entity').Events,
    (a: Events) => a.category,
  )
  events?: Events[];
}