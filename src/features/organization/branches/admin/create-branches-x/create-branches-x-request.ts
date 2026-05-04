import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, MaxLength } from 'class-validator';
import { CreateBranchesXResponse } from './create-branches-x-response';

export class CreateBranchesXRequest extends Command<CreateBranchesXResponse> {
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