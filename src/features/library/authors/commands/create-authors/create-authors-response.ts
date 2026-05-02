import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateAuthorsResponse {
  @ApiProperty()
  @Expose()
  id!:number

  @ApiProperty()
  @Expose()
  fullName!: string;
}