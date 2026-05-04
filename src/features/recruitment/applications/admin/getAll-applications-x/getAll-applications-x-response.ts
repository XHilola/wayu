import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { applicationStatus } from '../../../../../core/enums/applicationStatus.enum';

export class GetAllApplicationsXResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  phoneNumber!: string;

  @Expose()
  @ApiProperty()
  email!: string;

  @Expose()
  @ApiProperty()
  vacancyId!: number;

  @Expose()
  @ApiProperty()
  resume!: string;

  @Expose()
  @ApiProperty({ enum: applicationStatus })
  status!: applicationStatus;
}