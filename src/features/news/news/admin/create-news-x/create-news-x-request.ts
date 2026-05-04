import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsArray, IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateNewsXResponse } from './create-news-x-response';

export class CreateNewsXRequest extends Command<CreateNewsXResponse> {
  @ApiProperty()
  @IsInt()
  categoryId!: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  countryId?: number;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  title!: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  image!: string;

  @ApiProperty()
  @IsDateString()
  date!: Date;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty({ type: [Number], required: false })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tagIds?: number[];
}