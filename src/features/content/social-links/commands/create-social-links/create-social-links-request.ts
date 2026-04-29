import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';

export class CreateSocialLinksRequest extends Command<CreateSocialLinksRequest> {
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  icon!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  link!: string;
}
