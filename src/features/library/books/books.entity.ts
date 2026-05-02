import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import type { Authors } from '../authors/authors.entity';
import type { BookCategories } from '../book-categories/bookCategories.entity';

@Entity('books')
export class Books extends BaseModel {

  @Column()
  authorId!: number;

  @Column()
  categoryId!: number;

  @Column({ length: 256 })
  title!: string;

  @Column({ length: 128 })
  image!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 256 })
  file!: string;

  @Column()
  pages!: number;

  @Column()
  year!: number;

  @JoinColumn({ name: 'authorId' })
  @ManyToOne(
    () => require('../authors/authors.entity').Authors,
    (a: Authors) => a.books,
  )
  author?: Authors;

  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(
    () => require('../book-categories/bookCategories.entity').BookCategories,
    (a: BookCategories) => a.books,
  )
  category?: BookCategories;
}