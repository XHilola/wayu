import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class UpdateStaticInfoXRequest extends Command<UpdateStaticInfoXRequest> {
  id!: number;

  @IsOptional() @IsString() @ApiPropertyOptional() @MaxLength(128) appStoreLink?: string;
  @IsOptional() @IsString() @ApiPropertyOptional() @MaxLength(128) playMarketLink?: string;
  @IsOptional() @IsString() @ApiPropertyOptional()                 aboutUs?: string;
}
