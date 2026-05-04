import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import  { Authors } from '../authors/authors.entity';
import  { BookCategories } from '../book-categories/bookCategories.entity';
import type {Relation} from 'typeorm';

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
  @ManyToOne(()=>Authors,author=>author.books)
  author?: Relation<Authors>

  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(()=>BookCategories,category=>category.books)
  category?: Relation<BookCategories>;
}