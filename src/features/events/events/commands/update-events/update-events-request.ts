import { IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class UpdateEventsRequest extends Command<UpdateEventsRequest> {
  id!: number;

  @IsOptional() @IsInt()        @ApiPropertyOptional()              categoryId?: number;
  @IsOptional() @IsString()     @ApiPropertyOptional() @MaxLength(256) title?: string;
  @IsOptional() @IsString()     @ApiPropertyOptional()              content?: string;
  @IsOptional() @IsString()     @ApiPropertyOptional() @MaxLength(128) image?: string;
  @IsOptional() @IsDateString() @ApiPropertyOptional()              date?: string;
  @IsOptional() @IsString()     @ApiPropertyOptional() @MaxLength(128) address?: string;
}
