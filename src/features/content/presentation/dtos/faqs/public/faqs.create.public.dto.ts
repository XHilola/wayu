import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class FaqsCreatePublicDto {
  @ApiProperty()
  @IsString()
  @MaxLength(256)
  question!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(512)
  answer!: string;

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tagIds?: number[];
}
