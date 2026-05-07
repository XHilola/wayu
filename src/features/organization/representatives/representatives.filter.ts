import { PaginationFilter } from '../../../core/filters/pagination.filter';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class RepresentativesFilter extends PaginationFilter{
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(64)
  fullName?: string;

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

}