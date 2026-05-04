import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateAuthorsXResponse } from './create-authors-x-response';

export class CreateAuthorsXRequest extends Command<CreateAuthorsXResponse>{
  @ApiProperty()
  @IsString()
  @Expose()
  @MaxLength(64)
  fullName!:string
}