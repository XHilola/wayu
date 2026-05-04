import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { CreateNewsCategoriesXResponse } from './create-news-categories-x-response';

export class CreateNewsCategoriesXRequest extends Command<CreateNewsCategoriesXResponse> {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;
}