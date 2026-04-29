import { IsDateString, IsInt, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class CreateEventsRequest extends Command<CreateEventsRequest> {
  @IsInt()
  @ApiProperty()
  categoryId!: number;

  @IsString()
  @ApiProperty()
  @MaxLength(256)
  title!: string;

  @IsString()
  @ApiProperty()
  content!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  image!: string;

  @IsDateString()
  @ApiProperty()
  date!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  address!: string;
}
