import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class UpdateInstagramPostsRequest extends Command<UpdateInstagramPostsRequest> {
  id!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @MaxLength(256)
  image?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @MaxLength(128)
  link?: string;
}
