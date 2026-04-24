import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class CountriesCreateAdminDto {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  flag!: any;
}

export class CountriesUpdateAdminDto {
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  title?: string;

  @Allow()
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  flag?: any;
}

export class CountriesListDto {
  @ApiProperty()
  @Expose()
  id!: number;

  @ApiProperty()
  @Expose()
  title!: string;

  @ApiProperty()
  @Allow()
  @Expose()
  flag!: string;
}
