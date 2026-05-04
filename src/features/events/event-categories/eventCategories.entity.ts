import { Column, Entity, OneToMany } from 'typeorm';
import { Events } from '../events/events.entity';
import { BaseModel } from '../../../core/basemodel';
import type {Relation} from 'typeorm'

@Entity('eventCategories')
export class EventCategories extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(()=>Events,events=>events.category)
  events?: Relation<Events[]>;
}