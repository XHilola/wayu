import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Countries } from '../../common/countries/countries.entity';
import { BaseModel } from '../../../core/basemodel';
import { Representatives } from './representatives.entity';

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
  @ManyToOne(() => Countries, (a) => a.branches)
  country?: Countries;

  @JoinColumn({ name: 'representativeId' })
  @ManyToOne(() => Representatives, (a) => a.branches)
  representative?: Representatives;
}
