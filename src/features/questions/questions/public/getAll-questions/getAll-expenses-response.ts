import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { questionStatus } from '../../../../../core/enums/questionStatus.enum';

export class GetAllQuestionsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  phoneNumber!: string;

  @Expose()
  @ApiProperty()
  question!: string;

  @Expose()
  @ApiProperty({ enum: questionStatus })
  status!: questionStatus;
}