import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateExpensesXResponse } from './update-expenses-x-response';

export class UpdateExpensesXRequest extends Command<UpdateExpensesXResponse> {
  id!: number;

  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty()
  @IsDateString()
  date!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  title!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  transactionId!: string;
}