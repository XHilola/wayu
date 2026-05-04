import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsInt, IsString, MaxLength } from 'class-validator';
import { CreateApplicationsResponse } from './create-applications-response';

export class CreateApplicationsRequest extends Command<CreateApplicationsResponse> {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber!: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(64)
  email!: string;

  @ApiProperty()
  @IsInt()
  vacancyId!: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  resume!: string;
}