import { Column, Entity, OneToMany } from 'typeorm';
import  { News } from '../news/news.entity';
import { BaseModel } from '../../../core/basemodel';
import type {Relation} from 'typeorm';

@Entity('newsCategories')
export class NewsCategories extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(()=>News,news=>news.category)
  news?: Relation<News[]>;
}