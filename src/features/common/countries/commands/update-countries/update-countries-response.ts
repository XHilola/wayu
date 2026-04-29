import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateCountriesResponse extends Command<UpdateCountriesResponse> {
  @ApiProperty()
  @Expose()
  id!:number

  @ApiProperty()
  @Expose()
  title!: string;

  @ApiProperty()
  @Expose()
  flag!: string;
}