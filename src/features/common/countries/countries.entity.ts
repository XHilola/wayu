import { Column, Entity, OneToMany } from 'typeorm';
import { Branches } from '../../organization/branches/branches.entity';
import { BaseModel } from '../../../core/basemodel';
import type {Relation} from 'typeorm';
import { News } from '../../news/news/news.entity';

@Entity('countries')
export class Countries extends BaseModel {

  @Column({ length: 64, unique: true })
  title!: string;

  @Column({ length: 128 })
  flag!: string;

  @OneToMany(()=>Branches,branches=>branches.country)
  branches?: Relation<Branches[]>;

  @OneToMany(()=>News,news=>news.country)
  news?:Relation<News>
}