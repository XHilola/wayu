import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';
import { CreateLanguagesResponse } from './create-languages-response';

export class CreateLanguagesRequest extends Command<CreateLanguagesResponse> {
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;
}
