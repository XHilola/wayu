import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { News } from './news.entity';
import { Faqs } from '../../../content/data/entities/faqs.entity';

@Entity('tags')
export class Tags extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @ManyToMany(() => News, (a) => a.tags)
  news?: News[];

  @ManyToMany(() => Faqs, (a) => a.tags)
  faqs?: Faqs[];
}
