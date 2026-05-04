import { Command } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { UpdateBookCategoryXResponse } from './update-book-category-x-response';

export class UpdateBookCategoryXRequest extends Command<UpdateBookCategoryXResponse>{
  id!:number

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!:string
}