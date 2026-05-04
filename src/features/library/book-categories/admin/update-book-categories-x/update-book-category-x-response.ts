import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookCategoryXResponse{
  @Expose()
  @ApiProperty()
  id!:number

  @Expose()
  @ApiProperty()
  title!:string
}