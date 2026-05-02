import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { CreateTagsResponse } from './create-tags-response';

export class CreateTagsRequest extends Command<CreateTagsResponse> {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;
}