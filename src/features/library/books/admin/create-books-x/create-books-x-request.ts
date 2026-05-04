import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateBooksXResponse } from './create-books-x-response';

export class CreateBooksXRequest extends Command<CreateBooksXResponse> {
  @ApiProperty()
  @IsInt()
  authorId!: number;

  @ApiProperty()
  @IsInt()
  categoryId!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  title!: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  image!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  file!: string;

  @ApiProperty()
  @IsInt()
  pages!: number;

  @ApiProperty()
  @IsInt()
  year!: number;
}