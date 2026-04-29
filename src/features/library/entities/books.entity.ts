import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import { Authors } from './authors.entity';
import { BookCategories } from './bookCategories.entity';


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
  @ManyToOne(() => Authors, (a) => a.books)
  author?: Authors;

  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(() => BookCategories, (a) => a.books)
  category?: BookCategories;
}
