import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Query } from '@nestjs/cqrs';

export class GetOneInstagramPostsXResponse extends Query<GetOneInstagramPostsXResponse> {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  link!: string;
}
