import { Column, Entity, OneToMany } from 'typeorm';
import { News } from './news.entity';
import { BaseModel } from '../../../core/basemodel';

@Entity('newsCategories')
export class NewsCategories extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(() => News, (a) => a.category)
  news?: News[];
}
