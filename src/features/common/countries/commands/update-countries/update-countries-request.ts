import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountriesRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(64)
  title?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  flag?: string;
}