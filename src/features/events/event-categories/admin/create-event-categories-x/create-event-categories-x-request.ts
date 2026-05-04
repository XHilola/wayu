import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class CreateEventCategoriesXRequest extends Command<CreateEventCategoriesXRequest> {
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;
}
