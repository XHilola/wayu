import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EventCategories } from '../event-categories/eventCategories.entity';
import { BaseModel } from '../../../core/basemodel';
import type {Relation} from 'typeorm'

@Entity('events')
export class Events extends BaseModel {

  @Column()
  categoryId!: number;

  @Column({ length: 256 })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ length: 128 })
  image!: string;

  @Column({ type: 'timestamp' })
  date!: string;

  @Column({ length: 128 })
  address!: string;

  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(()=>EventCategories,category=>category.events)
  category?: Relation<EventCategories>;
}