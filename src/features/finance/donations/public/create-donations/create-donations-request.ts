import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsString, MaxLength } from 'class-validator';
import { CreateDonationsResponse } from './create-donations-response';
import { paymentProvider } from '../../../../../core/enums/paymentProvider.enum';

export class CreateDonationsRequest extends Command<CreateDonationsResponse> {
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