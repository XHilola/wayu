import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { vacancyType } from '../../../../../core/enums/vacancyType.enum';

export class GetOneVacanciesXResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  address!: string;

  @Expose()
  @ApiProperty()
  description!: string;

  @Expose()
  @ApiProperty()
  phoneNumber!: string;

  @Expose()
  @ApiProperty({ enum: vacancyType })
  type!: vacancyType;

  @Expose()
  @ApiProperty()
  salary!: string;

  @Expose()
  @ApiProperty()
  isActive!: boolean;
}