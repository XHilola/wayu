import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class CreateInstagramPostsRequest extends Command<CreateInstagramPostsRequest> {
  @IsString()
  @ApiProperty()
  @MaxLength(256)
  image!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  link!: string;
}
