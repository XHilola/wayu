import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateAuthorsResponse } from './create-authors-response';

export class CreateAuthorsRequest extends Command<CreateAuthorsResponse>{
  @ApiProperty()
  @IsString()
  @Expose()
  @MaxLength(64)
  fullName!:string
}