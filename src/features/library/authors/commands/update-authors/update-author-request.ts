import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { UpdateAuthorResponse } from './update-author-response';

export class UpdateAuthorRequest extends Command<UpdateAuthorResponse> {
  id!:number

  @ApiProperty()
  @IsString()
  @Expose()
  @MaxLength(64)
  fullName!: string;
}