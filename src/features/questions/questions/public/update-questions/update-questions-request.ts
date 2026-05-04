import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { UpdateQuestionsResponse } from './update-questions-response';
import { questionStatus } from '../../../../../core/enums/questionStatus.enum';

export class UpdateQuestionsRequest extends Command<UpdateQuestionsResponse> {
  id!: number;

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

  @ApiProperty({ enum: questionStatus })
  @IsEnum(questionStatus)
  status!: questionStatus;
}