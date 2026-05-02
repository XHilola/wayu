import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';
import { UpdateLanguagesResponse } from './update-languages-response';

export class UpdateLanguagesRequest extends Command<UpdateLanguagesResponse> {
  id!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @MaxLength(64)
  title?: string;
}
