import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString, MaxLength } from 'class-validator';
import { CreateInstagramPostsXResponse } from './create-instagram-posts-x-response';

export class CreateInstagramPostsXRequest{
  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  image!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  link!: string;
}