import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, MaxLength } from 'class-validator';
import { CreateBranchesResponse } from './create-branches-response';

export class CreateBranchesRequest extends Command<CreateBranchesResponse> {
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