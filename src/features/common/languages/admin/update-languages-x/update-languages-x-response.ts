import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Query } from '@nestjs/cqrs';

export class UpdateLanguagesXResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;
}
