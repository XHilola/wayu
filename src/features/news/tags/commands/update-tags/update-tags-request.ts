import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { UpdateTagsResponse } from './update-tags-response';

export class UpdateTagsRequest extends Command<UpdateTagsResponse> {
  id!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;
}