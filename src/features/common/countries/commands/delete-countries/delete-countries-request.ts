import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class DeleteCountriesRequest extends Command<void>{
  @IsInt()
  @ApiProperty()
  id!:number
}