import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { EventCategories } from './eventCategories.entity';

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
  date!: Date;

  @Column({ length: 128 })
  address!: string;

  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(() => EventCategories, (a) => a.events)
  category?: EventCategories;
}
