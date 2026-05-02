import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateBooksResponse } from './update-books-response';

export class UpdateBooksRequest extends Command<UpdateBooksResponse> {
  id!: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  authorId?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  categoryId?: number;

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
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @Allow()
  @IsOptional()
  file?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  pages?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  year?: number;
}