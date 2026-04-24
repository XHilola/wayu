import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class LanguagesCreateAdminDto {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;
}

export class LanguagesUpdateAdminDto {
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  title?: string;
}
