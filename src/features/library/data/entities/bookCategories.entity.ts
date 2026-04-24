import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { Books } from './books.entity';

@Entity('bookCategories')
export class BookCategories extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(() => Books, (a) => a.category)
  books?: Books[];
}
