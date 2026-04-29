import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';
import { Countries } from '../../countries.entity';

export class CreateCountriesRequest extends Command<CreateCountriesRequest>{
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  flag!: string;
}