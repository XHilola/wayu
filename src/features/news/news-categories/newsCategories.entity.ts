import { Column, Entity, OneToMany } from 'typeorm';
import type { News } from '../news/news.entity';
import { BaseModel } from '../../../core/basemodel';

@Entity('newsCategories')
export class NewsCategories extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(
    () => require('../news/news.entity').News,
    (a: News) => a.category,
  )
  news?: News[];
}