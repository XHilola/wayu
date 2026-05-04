import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';
import { CreateLanguagesXResponse } from './create-languages-x-response';

export class CreateLanguagesXRequest extends Command<CreateLanguagesXResponse> {
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;
}
