import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { CreateTagsXResponse } from './create-tags-x-response';

export class CreateTagsXRequest extends Command<CreateTagsXResponse> {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;
}