import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsArray, IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateNewsResponse } from './update-news-response';

export class UpdateNewsRequest extends Command<UpdateNewsResponse> {
  id!: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  countryId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  title?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @Allow()
  @IsOptional()
  image?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ type: [Number], required: false })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tagIds?: number[];
}