import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { News } from './news.entity';

@Entity('newsCategories')
export class NewsCategories extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(() => News, (a) => a.category)
  news?: News[];
}
