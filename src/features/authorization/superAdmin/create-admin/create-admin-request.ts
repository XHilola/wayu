import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { loginType } from '../../../../core/enums/loginType.enum';
import { RolesEnum } from '../../../../core/enums/roles.enum';

export class CreateAdminRequest {
  @IsString() @MaxLength(64)
  @ApiProperty()
  fullName!: string;

  @IsString() @MaxLength(64)
  @ApiProperty()
  login!: string;

  @IsString() @ApiProperty()
  password!: string;

  @IsEnum(loginType)
  @ApiProperty({ enum: loginType })
  loginType!: loginType;

  @IsEnum(RolesEnum)
  @ApiProperty()
  role!: RolesEnum;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  birthDate?: Date;
}