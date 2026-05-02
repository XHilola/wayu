import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import type { NewsCategories } from '../news-categories/newsCategories.entity';
import type { Countries } from '../../common/countries/countries.entity';
import type { Tags } from '../tags/tags.entity';
import { BaseModel } from '../../../core/basemodel';

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
  @ManyToOne(
    () => require('../news-categories/newsCategories.entity').NewsCategories,
    (a: NewsCategories) => a.news,
  )
  category?: NewsCategories;

  @JoinColumn({ name: 'countryId' })
  @ManyToOne(
    () => require('../../common/countries/countries.entity').Countries,
    { nullable: true },
  )
  country?: Countries;

  @JoinTable({ name: 'newsTags', joinColumn: { name: 'newsId' }, inverseJoinColumn: { name: 'tagId' } })
  @ManyToMany(
    () => require('../tags/tags.entity').Tags,
    (a: Tags) => a.news,
  )
  tags?: Tags[];
}