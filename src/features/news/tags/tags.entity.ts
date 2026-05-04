import { Column, Entity, ManyToMany } from 'typeorm';
import  { News } from '../news/news.entity';
import  { Faqs } from '../../content/faqs/faqs.entity';
import { BaseModel } from '../../../core/basemodel';
import type {Relation} from 'typeorm';

@Entity('tags')
export class Tags extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @ManyToMany(()=>News,news=>news.tags)
  news?: Relation<News[]>;

  @ManyToMany(()=>Faqs,faqs=>faqs.tags)
  faqs?: Relation<Faqs[]>;
}