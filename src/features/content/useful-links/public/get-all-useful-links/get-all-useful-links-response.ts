import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Query } from '@nestjs/cqrs';

export class GetAllUsefulLinksResponse{
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  icon!: string;

  @Expose()
  @ApiProperty()
  link!: string;
}
