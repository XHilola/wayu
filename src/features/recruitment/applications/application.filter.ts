import { PaginationFilter } from '../../../core/filters/pagination.filter';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { applicationStatus } from '../../../core/enums/applicationStatus.enum';

export class ApplicationFilter extends PaginationFilter{
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(64)
  fullName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(16)
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  @MaxLength(64)
  email?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  vacancyId?: number;

  @ApiProperty({ enum: applicationStatus, required: false })
  @IsEnum(applicationStatus)
  @IsOptional()
  status?: applicationStatus;
}