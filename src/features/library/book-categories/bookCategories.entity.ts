import { Column, Entity, OneToMany } from 'typeorm';
import { Books } from '../books/books.entity';
import { BaseModel } from '../../../core/basemodel';
import type {Relation} from 'typeorm';

@Entity('bookCategories')
export class BookCategories extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(()=>Books,books=>books.category)
  books?: Relation<Books[]>;
}