import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import type { Tags } from '../../news/tags/tags.entity';

@Entity('faqs')
export class Faqs extends BaseModel {

  @Column({ length: 256 })
  question!: string;

  @Column({ length: 512 })
  answer!: string;

  @JoinTable({ name: 'faqsTags', joinColumn: { name: 'faqsId' }, inverseJoinColumn: { name: 'tagId' } })
  @ManyToMany(
    () => require('../../news/tags/tags.entity').Tags,
    (a: Tags) => a.faqs,
  )
  tags?: Tags[];
}