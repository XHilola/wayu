import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateApplicationsResponse } from './update-applications-response';
import { applicationStatus } from '../../../../../core/enums/applicationStatus.enum';

export class UpdateApplicationsRequest extends Command<UpdateApplicationsResponse> {
  id!: number;

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

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @Allow()
  @IsOptional()
  resume?: string;

  @ApiProperty({ enum: applicationStatus, required: false })
  @IsEnum(applicationStatus)
  @IsOptional()
  status?: applicationStatus;
}