import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Query } from '@nestjs/cqrs';

class CategoryResponse {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() title!: string;
}

export class GetOneEventsResponse{
  @Expose()
  @ApiProperty()
  id!: number;
  @Expose()
  @ApiProperty()
  categoryId!: number;
  @Expose()
  @ApiProperty()
  title!: string;
  @Expose()
  @ApiProperty()
  content!: string;
  @Expose()
  @ApiProperty()
  image!: string;
  @Expose()
  @ApiProperty()
  date!: string;
  @Expose()
  @ApiProperty()
  address!: string;

  @Expose()
  @ApiProperty({ type: CategoryResponse })
  @Type(() => CategoryResponse)
  category!: CategoryResponse;
}
