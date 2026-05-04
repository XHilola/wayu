import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateExpensesXResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  amount!: number;

  @Expose()
  @ApiProperty()
  date!: string;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty({ required: false })
  description?: string;

  @Expose()
  @ApiProperty()
  transactionId!: string;
}