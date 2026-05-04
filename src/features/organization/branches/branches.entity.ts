import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import  { Countries } from '../../common/countries/countries.entity';
import { BaseModel } from '../../../core/basemodel';
import  { Representatives } from '../representatives/representatives.entity';
import type {Relation} from 'typeorm';

@Entity('branches')
export class Branches extends BaseModel {

  @Column()
  countryId!: number;

  @Column()
  representativeId!: number;

  @Column({ length: 64 })
  city!: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude!: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude!: number;

  @Column({ length: 16 })
  phoneNumber!: string;

  @JoinColumn({ name: 'countryId' })
  @ManyToOne(()=>Countries,country=>country.branches)
  country?: Relation<Countries>;

  @JoinColumn({ name: 'representativeId' })
  @ManyToOne(()=>Representatives,representatives=>representatives.branches)
  representative?: Relation<Representatives>;
}