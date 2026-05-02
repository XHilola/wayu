import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { vacancyType } from '../../../../../core/enums/vacancyType.enum';
import { UpdateVacanciesResponse } from './update-vacancies-response';

export class UpdateVacanciesRequest extends Command<UpdateVacanciesResponse> {
  id!: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(128)
  address?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(16)
  phoneNumber?: string;

  @ApiProperty({ enum: vacancyType, required: false })
  @IsEnum(vacancyType)
  @IsOptional()
  type?: vacancyType;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(64)
  salary?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}