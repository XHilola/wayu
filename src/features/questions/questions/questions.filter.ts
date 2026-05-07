import { PaginationFilter } from '../../../core/filters/pagination.filter';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { questionStatus } from '../../../core/enums/questionStatus.enum';

export class QuestionsFilter extends PaginationFilter{
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(2000)
  question?: string;

  @ApiProperty({ enum: questionStatus })
  @IsEnum(questionStatus)
  status?: questionStatus;
}