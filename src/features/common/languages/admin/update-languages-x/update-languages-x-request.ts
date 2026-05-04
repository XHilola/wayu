import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';
import { UpdateLanguagesXResponse } from './update-languages-x-response';

export class UpdateLanguagesXRequest extends Command<UpdateLanguagesXResponse> {
  id!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @MaxLength(64)
  title?: string;
}
