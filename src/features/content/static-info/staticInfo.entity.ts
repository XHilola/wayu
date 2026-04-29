import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';

@Entity('staticInfo')
export class StaticInfo extends BaseModel {

  @Column({ length: 128, nullable: true })
  appStoreLink?: string;

  @Column({ length: 128, nullable: true })
  playMarketLink?: string;

  @Column({ type: 'text' })
  aboutUs!: string;
}
