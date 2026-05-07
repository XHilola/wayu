import { PaginationFilter } from '../../../core/filters/pagination.filter';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, MaxLength } from 'class-validator';

export class BranchesFilter extends PaginationFilter{
  @ApiProperty()
  @IsInt()
  countryId?: number;

  @ApiProperty()
  @IsInt()
  representativeId?: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  city?: string;

  @ApiProperty()
  @IsNumber()
  latitude?: number;

  @ApiProperty()
  @IsNumber()
  longitude?: number;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber?: string;
}