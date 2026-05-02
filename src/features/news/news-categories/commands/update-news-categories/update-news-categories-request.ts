import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { UpdateNewsCategoriesResponse } from './update-news-categories-response';

export class UpdateNewsCategoriesRequest extends Command<UpdateNewsCategoriesResponse> {
  id!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;
}