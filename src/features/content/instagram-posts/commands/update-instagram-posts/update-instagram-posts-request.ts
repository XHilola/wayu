import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateInstagramPostsResponse } from './update-instagram-posts-response';

export class UpdateInstagramPostsRequest extends Command<UpdateInstagramPostsResponse> {
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