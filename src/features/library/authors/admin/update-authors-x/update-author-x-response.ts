import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateAuthorXResponse {
  @ApiProperty()
  @Expose()
  id!: number;

  @ApiProperty()
  @Expose()
  fullName!: string;
}