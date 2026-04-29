import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateCountriesRequest extends Command<UpdateCountriesRequest> {
  @IsInt()
  @ApiProperty()
  @Expose()
  id!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  @Expose()
  title?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  @Expose()
  flag?: string;
}