import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { CreateQuestionsResponse } from './create-questions-response';

export class CreateQuestionsRequest extends Command<CreateQuestionsResponse> {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(2000)
  question!: string;
}