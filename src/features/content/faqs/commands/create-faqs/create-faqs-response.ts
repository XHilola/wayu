import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class TagResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;
}

export class CreateFaqsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  question!: string;

  @Expose()
  @ApiProperty()
  answer!: string;

  @Expose()
  @ApiProperty({ type: [TagResponse] })
  @Type(() => TagResponse)
  tags!: TagResponse[];
}
