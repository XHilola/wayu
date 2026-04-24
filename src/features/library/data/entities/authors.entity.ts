import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { Books } from './books.entity';

@Entity('authors')
export class Authors extends BaseModel {

  @Column({ length: 64 })
  fullName!: string;

  @OneToMany(() => Books, (a) => a.author)
  books?: Books[];
}
