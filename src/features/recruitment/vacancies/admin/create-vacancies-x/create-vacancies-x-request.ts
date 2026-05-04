import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { vacancyType } from '../../../../../core/enums/vacancyType.enum';
import { CreateVacanciesXResponse } from './create-vacancies-x-response';

export class CreateVacanciesXRequest extends Command<CreateVacanciesXResponse> {
  @ApiProperty()
  @IsString()
  @MaxLength(256)
  title!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  address!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber!: string;

  @ApiProperty({ enum: vacancyType })
  @IsEnum(vacancyType)
  type!: vacancyType;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  salary!: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}