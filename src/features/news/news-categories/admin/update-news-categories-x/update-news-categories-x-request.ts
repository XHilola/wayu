import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { UpdateNewsCategoriesXResponse } from './update-news-categories-x-response';

export class UpdateNewsCategoriesXRequest extends Command<UpdateNewsCategoriesXResponse> {
  id!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;
}