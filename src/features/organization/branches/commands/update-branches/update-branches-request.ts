import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, MaxLength } from 'class-validator';
import { UpdateBranchesResponse } from './update-branches-response';

export class UpdateBranchesRequest extends Command<UpdateBranchesResponse> {
  id!: number;

  @ApiProperty()
  @IsInt()
  countryId!: number;

  @ApiProperty()
  @IsInt()
  representativeId!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  city!: string;

  @ApiProperty()
  @IsNumber()
  latitude!: number;

  @ApiProperty()
  @IsNumber()
  longitude!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber!: string;
}