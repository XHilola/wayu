import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateEventsXResponse } from './update-events-x-response';

export class UpdateEventsXRequest {
  id!: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @Allow()
  @IsOptional()
  image?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(128)
  address?: string;
}