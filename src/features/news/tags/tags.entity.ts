import { Column, Entity, ManyToMany } from 'typeorm';
import type { News } from '../news/news.entity';
import type { Faqs } from '../../content/faqs/faqs.entity';
import { BaseModel } from '../../../core/basemodel';

@Entity('tags')
export class Tags extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @ManyToMany(
    () => require('../news/news.entity').News,
    (a: News) => a.tags,
  )
  news?: News[];

  @ManyToMany(
    () => require('../../content/faqs/faqs.entity').Faqs,
    (a: Faqs) => a.tags,
  )
  faqs?: Faqs[];
}