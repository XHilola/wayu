import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsDateString, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateEventsRequest {
  @ApiProperty()
  @IsInt()
  categoryId!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  title!: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  image!: string;

  @ApiProperty()
  @IsDateString()
  date!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  address!: string;
}