import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateSocialLinksResponse } from './update-social-links-response';

export class UpdateSocialLinksRequest {
  id!: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(64)
  title?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @Allow()
  @IsOptional()
  icon?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(128)
  link?: string;
}