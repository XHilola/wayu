import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { CreateNewsCategoriesResponse } from './create-news-categories-response';

export class CreateNewsCategoriesRequest extends Command<CreateNewsCategoriesResponse> {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;
}