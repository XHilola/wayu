import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class TagDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;
}

export class GetAllNewsXResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  categoryId!: number;

  @Expose()
  @ApiProperty({ required: false })
  countryId?: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  date!: Date;

  @Expose()
  @ApiProperty()
  content!: string;

  @Expose()
  @ApiProperty({ type: () => TagDto, isArray: true })
  @Type(() => TagDto)
  tags?: TagDto[];
}