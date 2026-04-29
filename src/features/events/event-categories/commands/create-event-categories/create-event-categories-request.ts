import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class CreateEventCategoriesRequest extends Command<CreateEventCategoriesRequest> {
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;
}
