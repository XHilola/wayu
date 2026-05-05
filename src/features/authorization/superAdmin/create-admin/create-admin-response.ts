import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RolesEnum } from '../../../../core/enums/roles.enum';

export class CreateAdminResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  login!: string;

  @Expose()
  @ApiProperty({ enum: RolesEnum })
  role!: RolesEnum;

  @Expose()
  @ApiProperty()
  isActive!: boolean;

}