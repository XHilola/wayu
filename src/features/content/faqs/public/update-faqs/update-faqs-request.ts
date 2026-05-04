import { IsArray, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class UpdateFaqsRequest extends Command<UpdateFaqsRequest> {
  id!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @MaxLength(256)
  question?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @MaxLength(512)
  answer?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @ApiPropertyOptional({ type: [Number] })
  tagIds?: number[];
}
