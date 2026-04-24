import { Column, Entity } from 'typeorm';
import { BaseModel } from 'src/core/base-models';
import { paymentProvider } from '../enums/paymentProvider.enum';

@Entity('donations')
export class Donations extends BaseModel {

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Column({ length: 64 })
  fullName!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ type: 'enum', enum: paymentProvider })
  paidBy!: paymentProvider;
}
