import { Column, Entity, OneToMany } from 'typeorm';
import { Books } from './books.entity';
import { BaseModel } from '../../../core/basemodel';

@Entity('bookCategories')
export class BookCategories extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(() => Books, (a) => a.category)
  books?: Books[];
}
