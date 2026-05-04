import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { UpdateAuthorXResponse } from './update-author-x-response';

export class UpdateAuthorXRequest extends Command<UpdateAuthorXResponse> {
  id!:number

  @ApiProperty()
  @IsString()
  @Expose()
  @MaxLength(64)
  fullName!: string;
}