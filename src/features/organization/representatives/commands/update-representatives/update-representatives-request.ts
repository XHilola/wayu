import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateRepresentativesResponse } from './update-representatives-response';

export class UpdateRepresentativesRequest extends Command<UpdateRepresentativesResponse> {
  id!: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(64)
  fullName?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @Allow()
  @IsOptional()
  image?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  @MaxLength(64)
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(16)
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  resume?: string;
}