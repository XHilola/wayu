import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { Countries } from '../../../common/data/entities/countries.entity';
import { Representatives } from '../../../../../../../entity/representatives.entity';

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
