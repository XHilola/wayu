import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IQuery, Query } from '@nestjs/cqrs';

export class CreateCountriesResponse extends Query<CreateCountriesResponse>{
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  flag!: string;
}
