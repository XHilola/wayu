import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { UpdateTagsXResponse } from './update-tags-X-response';

export class UpdateTagsXRequest extends Command<UpdateTagsXResponse> {
  id!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;
}