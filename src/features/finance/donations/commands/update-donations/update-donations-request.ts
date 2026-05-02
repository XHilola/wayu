import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsString, MaxLength } from 'class-validator';
import { UpdateDonationsResponse } from './update-donations-response';
import { paymentProvider } from '../../../../../core/enums/paymentProvider.enum';

export class UpdateDonationsRequest extends Command<UpdateDonationsResponse> {
  id!: number;

  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName!: string;

  @ApiProperty()
  @IsDateString()
  date!: string;

  @ApiProperty({ enum: paymentProvider })
  @IsEnum(paymentProvider)
  paidBy!: paymentProvider;
}