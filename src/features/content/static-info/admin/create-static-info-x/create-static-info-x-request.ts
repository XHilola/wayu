import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class CreateStaticInfoXRequest extends Command<CreateStaticInfoXRequest> {
  id!: number;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  appStoreLink?: string;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  playMarketLink?: string;

  @IsString()
  @ApiProperty()
  aboutUs!: string;
}
