import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsString, MaxLength } from 'class-validator';
import { CreateRepresentativesXResponse } from './create-representatives-x-response';

export class CreateRepresentativesXRequest extends Command<CreateRepresentativesXResponse> {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName!: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  image!: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(64)
  email!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber!: string;

  @ApiProperty()
  @IsString()
  resume!: string;
}