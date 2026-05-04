import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateBranchesXResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  countryId!: number;

  @Expose()
  @ApiProperty()
  representativeId!: number;

  @Expose()
  @ApiProperty()
  city!: string;

  @Expose()
  @ApiProperty()
  latitude!: number;

  @Expose()
  @ApiProperty()
  longitude!: number;

  @Expose()
  @ApiProperty()
  phoneNumber!: string;
}