import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString, MaxLength } from 'class-validator';
import { CreateUsefulLinksXResponse } from './create-useful-links-x-response';

export class CreateUsefulLinksXRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(128)
  title!: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  icon!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  link!: string;
}