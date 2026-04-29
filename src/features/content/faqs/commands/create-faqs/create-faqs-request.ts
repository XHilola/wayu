import { IsArray, IsInt, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';
import { CreateFaqsResponse } from './create-faqs-response';

export class CreateFaqsRequest extends Command<CreateFaqsResponse> {
  @IsString()
  @ApiProperty()
  @MaxLength(256)
  question!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(512)
  answer!: string;

  @IsArray()
  @IsInt({ each: true })
  @ApiProperty()
  tagId!: number[];
}
