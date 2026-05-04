import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateInstagramPostsXResponse } from './update-instagram-posts-x-response';

export class UpdateInstagramPostsXRequest extends Command<UpdateInstagramPostsXResponse> {
  id!: number;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @Allow()
  @IsOptional()
  image?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(128)
  link?: string;
}