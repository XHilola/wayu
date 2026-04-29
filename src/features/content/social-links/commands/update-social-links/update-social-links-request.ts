import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class UpdateSocialLinksRequest extends Command<UpdateSocialLinksRequest> {
  id!: number;

  @IsOptional() @IsString() @ApiPropertyOptional() @MaxLength(64)  title?: string;
  @IsOptional() @IsString() @ApiPropertyOptional() @MaxLength(128) icon?: string;
  @IsOptional() @IsString() @ApiPropertyOptional() @MaxLength(128) link?: string;
}
