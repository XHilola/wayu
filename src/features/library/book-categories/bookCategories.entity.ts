import { Column, Entity, OneToMany } from 'typeorm';
import type { Books } from '../books/books.entity';
import { BaseModel } from '../../../core/basemodel';

@Entity('bookCategories')
export class BookCategories extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(
    () => require('../books/books.entity').Books,
    (a: Books) => a.category,
  )
  books?: Books[];
}