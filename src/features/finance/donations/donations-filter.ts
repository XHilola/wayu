import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PaginationFilter } from '../../../core/filters/pagination.filter';
import { paymentProvider } from '../../../core/enums/paymentProvider.enum';

export class GetAllDonationsFilter extends PaginationFilter {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ required: false, enum: paymentProvider })
  @IsEnum(paymentProvider)
  @IsOptional()
  paidBy?: paymentProvider;
}