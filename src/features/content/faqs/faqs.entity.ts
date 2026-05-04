import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import { Tags } from '../../news/tags/tags.entity';
import type {Relation} from 'typeorm';

@Entity('faqs')
export class Faqs extends BaseModel {

  @Column({ length: 256 })
  question!: string;

  @Column({ length: 512 })
  answer!: string;

  @JoinTable({ name: 'faqsTags', joinColumn: { name: 'faqsId' }, inverseJoinColumn: { name: 'tagId' } })
  @ManyToMany(()=>Tags,tags=>tags.faqs)
  tags?: Relation<Tags[]>;
}