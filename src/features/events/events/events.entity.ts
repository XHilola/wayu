import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import type { EventCategories } from '../event-categories/eventCategories.entity';
import { BaseModel } from '../../../core/basemodel';

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
  @ManyToOne(
    () => require('../event-categories/eventCategories.entity').EventCategories,
    (a: EventCategories) => a.events,
  )
  category?: EventCategories;
}