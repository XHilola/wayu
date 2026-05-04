import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import  { NewsCategories } from '../news-categories/newsCategories.entity';
import  { Countries } from '../../common/countries/countries.entity';
import  { Tags } from '../tags/tags.entity';
import { BaseModel } from '../../../core/basemodel';
import type {Relation} from 'typeorm'

@Entity('news')
export class News extends BaseModel {

  @Column()
  categoryId!: number;

  @Column({ nullable: true })
  countryId?: number;

  @Column({ length: 256 })
  title!: string;

  @Column({ length: 128 })
  image!: string;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'text' })
  content!: string;

  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(()=>NewsCategories,category=>category.news)
  category?: Relation<NewsCategories>;

  @JoinColumn({ name: 'countryId' })
  @ManyToOne(()=>Countries,country=>country.news)
  country?: Relation<Countries>;

  @JoinTable({ name: 'newsTags', joinColumn: { name: 'newsId' }, inverseJoinColumn: { name: 'tagId' } })
  @ManyToMany(()=>Tags,tags=>tags.news)
  tags?:Relation<Tags[]>;
}