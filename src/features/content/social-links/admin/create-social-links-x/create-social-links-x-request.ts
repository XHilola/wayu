import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString, MaxLength } from 'class-validator';

export class CreateSocialLinksXRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  icon!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  link!: string;
}