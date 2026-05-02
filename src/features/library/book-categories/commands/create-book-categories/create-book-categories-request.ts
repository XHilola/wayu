import { Command } from '@nestjs/cqrs';
import { CreateBookCategoriesResponse } from './create-book-categories-response';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBookCategoriesRequest extends Command<CreateBookCategoriesResponse>{
  id!:number

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!:string
}