import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginResponse {
  @Expose()
  @ApiProperty()
  accessToken!: string;
}