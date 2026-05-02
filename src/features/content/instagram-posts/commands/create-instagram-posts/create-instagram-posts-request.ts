import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString, MaxLength } from 'class-validator';
import { CreateInstagramPostsResponse } from './create-instagram-posts-response';

export class CreateInstagramPostsRequest{
  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  image!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  link!: string;
}