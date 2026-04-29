import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/basemodel';
import { paymentProvider } from '../../../core/enums/paymentProvider.enum';


@Entity('donations')
export class Donations extends BaseModel {

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Column({ length: 64 })
  fullName!: string;

  @Column({ type: 'timestamp' })
  date!: string;

  @Column({ type: 'enum', enum: paymentProvider })
  paidBy!: paymentProvider;
}
