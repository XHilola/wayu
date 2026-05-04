import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class UpdateEventCategoriesXRequest extends Command<UpdateEventCategoriesXRequest> {
  id!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @MaxLength(64)
  title?: string;
}
