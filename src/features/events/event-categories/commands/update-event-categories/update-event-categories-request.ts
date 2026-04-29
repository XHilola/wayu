import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class UpdateEventCategoriesRequest extends Command<UpdateEventCategoriesRequest> {
  id!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @MaxLength(64)
  title?: string;
}
