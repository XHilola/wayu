import { Column, Entity, ManyToMany } from 'typeorm';
import { News } from './news.entity';
import { Faqs } from '../../content/faqs/faqs.entity';
import { BaseModel } from '../../../core/basemodel';

@Entity('tags')
export class Tags extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @ManyToMany(() => News, (a) => a.tags)
  news?: News[];

  @ManyToMany(() => Faqs, (a) => a.tags)
  faqs?: Faqs[];
}
