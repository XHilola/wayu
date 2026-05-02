import { Command } from '@nestjs/cqrs';
import { UpdateBookCategoryResponse } from './update-book-category-response';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateBookCategoryRequest extends Command<UpdateBookCategoryResponse>{
  id!:number

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!:string
}