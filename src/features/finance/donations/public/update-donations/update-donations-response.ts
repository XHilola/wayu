import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { paymentProvider } from '../../../../../core/enums/paymentProvider.enum';

export class UpdateDonationsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  amount!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  date!: string;

  @Expose()
  @ApiProperty({ enum: paymentProvider })
  paidBy!: paymentProvider;
}