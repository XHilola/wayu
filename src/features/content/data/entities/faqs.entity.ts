import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { Tags } from '../../../../../../../entity/tags.entity';

@Entity('faqs')
export class Faqs extends BaseModel {

  @Column({ length: 256 })
  question!: string;

  @Column({ length: 512 })
  answer!: string;

  @JoinTable({ name: 'faqsTags', joinColumn: { name: 'faqsId' }, inverseJoinColumn: { name: 'tagId' } })
  @ManyToMany(() => Tags, (a) => a.faqs)
  tags?: Tags[];
}
