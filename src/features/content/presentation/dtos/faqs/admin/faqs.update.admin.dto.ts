import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class FaqsUpdateAdminDto {
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  question?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(512)
  @IsOptional()
  answer?: string;

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tagIds?: number[];
}
