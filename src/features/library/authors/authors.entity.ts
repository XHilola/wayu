import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import { Books } from '../books/books.entity';
import type {Relation} from 'typeorm'

@Entity('authors')
export class Authors extends BaseModel {

  @Column({ length: 64 })
  fullName!: string;

  @OneToMany(()=>Books, books=>books.author)
  books?: Relation<Books[]>;
}