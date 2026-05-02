import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import type { Books } from '../books/books.entity';

@Entity('authors')
export class Authors extends BaseModel {

  @Column({ length: 64 })
  fullName!: string;

  @OneToMany(
    () => require('../books/books.entity').Books,
    (a: Books) => a.author,
  )
  books?: Books[];
}