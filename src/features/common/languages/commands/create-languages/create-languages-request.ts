import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class CreateLanguagesRequest extends Command<CreateLanguagesRequest> {
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;
}
