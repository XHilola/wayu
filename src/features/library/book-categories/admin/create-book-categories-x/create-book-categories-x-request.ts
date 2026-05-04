import { Command } from '@nestjs/cqrs';
import { CreateBookCategoriesXResponse } from './create-book-categories-x-response';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBookCategoriesXRequest extends Command<CreateBookCategoriesXResponse>{
  id!:number

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!:string
}