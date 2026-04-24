import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { NewsCategories } from './newsCategories.entity';
import { Countries } from '../../../common/data/entities/countries.entity';
import { Tags } from '../../../../../../../entity/tags.entity';

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
  @ManyToOne(() => NewsCategories, (a) => a.news)
  category?: NewsCategories;

  @JoinColumn({ name: 'countryId' })
  @ManyToOne(() => Countries, { nullable: true })
  country?: Countries;

  @JoinTable({ name: 'newsTags', joinColumn: { name: 'newsId' }, inverseJoinColumn: { name: 'tagId' } })
  @ManyToMany(() => Tags, (a) => a.news)
  tags?: Tags[];
}
